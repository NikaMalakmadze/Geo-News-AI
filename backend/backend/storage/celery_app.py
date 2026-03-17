from celery.schedules import crontab
from sqlalchemy.orm import Session
from celery import Celery

from backend.services.scraper_service import ScraperService
from backend.services.ml_service import MlService
from backend.database.db import sessionLocal
from backend.conf.config import BASE_DIR, Settings, get_settings

settings: Settings = get_settings()

celery: Celery = Celery(
    "app", broker=f"{settings.REDIS_URI}/0", backend=f"{settings.REDIS_URI}/1"
)

celery.conf.update(
    timezone="UTC",
    enable_utc=True,
    beat_schedule_filename=str(BASE_DIR / "data" / "celerybeat-schedule"),
    beat_schedule={
        "scrape-posts-every-hour": {
            "task": "app.tasks.scrape_posts",
            "schedule": crontab(minute=0),
        }
    },
)
service: MlService | None = None


@celery.task
def analyze_post(text: str, tags: list[str]):
    global service
    if service is None:
        service = MlService()
    return service.analyze(text, tags).model_dump(mode="json")


@celery.task(
    name="app.tasks.scrape_posts",
    bind=True,
    autoretry_for=(Exception,),
    retry_backoff=30,
)
def scrape_posts(_):
    db: Session = sessionLocal()
    try:
        service = ScraperService(db)
        posts = service.scrape()
        service.save_posts(posts)
    finally:
        db.close()
