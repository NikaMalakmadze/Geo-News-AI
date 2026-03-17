from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from scraper.conf.chrome_driver import create_chrome_driver
from backend.database.models import PostDb
from scraper.conf.config import settings
from scraper.core.script import Scraper
from shared.schemas import Post


class ScraperService:
    def __init__(self, db: Session) -> None:
        self.scraper: Scraper = Scraper(
            create_chrome_driver(),
            settings.BASE_URL,
            settings.SITE_URL,
            settings.CATEGORIES,
            False,
        )
        self.db = db

    def scrape(self) -> list[Post]:
        total_posts: list[Post] = []
        for category in settings.CATEGORIES:
            category_posts: list[Post] = self.scraper.get_posts(
                category=category, per_page=3, start_page=1, stop_page=2
            )
            total_posts.extend(category_posts)
        return total_posts

    def save_posts(self, posts: list[Post]) -> None:
        values = [
            {**post.model_dump(exclude={"id"}), "slug": post.id} for post in posts
        ]

        stmt = insert(PostDb).values(values)
        stmt = stmt.on_conflict_do_nothing(index_elements=["slug"])

        self.db.execute(stmt)
        self.db.commit()
