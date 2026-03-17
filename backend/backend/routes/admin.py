from sqlalchemy.orm import Session, Query
from datetime import datetime, timedelta
from fastapi.routing import APIRouter
from typing import Annotated
from fastapi import Depends

from backend.utils.helpers import (
    str_property_count,
    json_array_top_values,
    post_count_in_date_range,
    posts_by_days,
)
from backend.schemas.admin import (
    AnalyzeSchemaBase,
    StatCount,
    StatsResponse,
    PostsByDate,
    EntitiesCount,
    AdminPost,
)
from backend.utils.datetime_helpers import current_day_range, current_week_range
from backend.middleware.verify_admin import verify_api_key
from backend.database.models import PostDb, PostDbAnanlyze
from backend.schemas.page import PageParams, PageResponse
from backend.utils.paginate import paginate
from backend.utils.helpers import get_post
from backend.database.db import get_db
from shared.schemas import Post

admin_router = APIRouter(prefix="/admin", dependencies=[Depends(verify_api_key)])


@admin_router.get("/verify")
async def verify_token() -> dict[str, str]:
    return {"message": "Success"}


@admin_router.post("/add")
async def manual_add(
    posts: list[Post], db: Annotated[Session, Depends(get_db)]
) -> dict[str, str]:
    posts_ids: set[str] = set(slug for (slug,) in db.query(PostDb.slug).all())

    posts_orm: list[PostDb] = [
        PostDb(**post.model_dump(exclude={"id"}), slug=post.id)
        for post in posts
        if post.id not in posts_ids
    ]
    db.add_all(posts_orm)
    db.commit()
    return {"message": f"Inserted {len(posts_orm)} posts."}


@admin_router.delete("/clear")
async def clear_posts(db: Annotated[Session, Depends(get_db)]) -> dict[str, str]:
    deleted = db.query(PostDb).delete()
    db.commit()
    return {"message": f"Deleted {deleted} posts."}


@admin_router.get("/stats")
async def get_stats(db: Annotated[Session, Depends(get_db)]) -> StatsResponse:
    sentiment_counts: list[StatCount] = str_property_count(
        db, PostDbAnanlyze.sentiment, PostDbAnanlyze.post_id
    )
    keywords_counts: list[StatCount] = json_array_top_values(
        db, PostDbAnanlyze.keywords, 5
    )
    category_counts: list[StatCount] = str_property_count(
        db, PostDb.category, PostDb.slug
    )
    tags_counts: list[StatCount] = json_array_top_values(db, PostDb.tags, 5)
    predicted_category_count: list[StatCount] = str_property_count(
        db, PostDbAnanlyze.predicted_category, PostDbAnanlyze.id
    )

    persons_counts = json_array_top_values(db, PostDbAnanlyze.persons, 5)
    organizations_counts = json_array_top_values(db, PostDbAnanlyze.organizations, 5)
    cities_counts = json_array_top_values(db, PostDbAnanlyze.cities, 5)
    countries_counts = json_array_top_values(db, PostDbAnanlyze.countries, 5)

    today_posts_count: int = post_count_in_date_range(db, current_day_range())
    week_posts_count: int = post_count_in_date_range(db, current_week_range())
    analyzes_count: int = db.query(PostDbAnanlyze).count()
    total_posts: int = db.query(PostDb).count()

    two_weeks_posts: list[PostsByDate] = posts_by_days(
        db, (datetime.now() - timedelta(days=14), datetime.now())
    )

    return StatsResponse(
        category_count=category_counts,
        predicted_category_count=predicted_category_count,
        sentiment_count=sentiment_counts,
        keyword_count=keywords_counts,
        tags_counts=tags_counts,
        total_posts=total_posts,
        today_posts_count=today_posts_count,
        week_posts_count=week_posts_count,
        analyzes_count=analyzes_count,
        posts_by_days=two_weeks_posts,
        entities_count=EntitiesCount(
            persons=persons_counts,
            organizations=organizations_counts,
            cities=cities_counts,
            countries=countries_counts,
        ),
    )


@admin_router.get("/posts/")
async def get_posts(
    page_params: PageParams = Depends(), db: Session = Depends(get_db)
) -> PageResponse[AdminPost]:
    query: Query[PostDb] = db.query(PostDb)

    return paginate(page_params, query, AdminPost)


@admin_router.patch("/posts/analyze/{post_id}")
async def update_analyze(
    post_id: str,
    analyze: Annotated[AnalyzeSchemaBase, Depends],
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, str]:
    post: PostDb | None = get_post(db, post_id)

    if not post.analyze:
        return {"message": "Analyze not found"}

    for field, value in analyze.model_dump(exclude_unset=True).items():
        setattr(post.analyze, field, value)

    db.commit()
    db.refresh(post.analyze)

    return {"message": f"Analyze for post {post_id} was Changed"}


@admin_router.delete("/posts/analyze/{post_id}")
async def delete_analyze(
    post_id: str, db: Annotated[Session, Depends(get_db)]
) -> dict[str, str]:
    post: PostDb | None = get_post(db, post_id)

    if not post.analyze:
        return {"message": "Analyze not found"}

    db.delete(post.analyze)
    db.commit()

    return {"message": f"Analyze for post {post_id} was deleted"}


@admin_router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str, db: Annotated[Session, Depends(get_db)]
) -> dict[str, str]:
    post: PostDb | None = get_post(db, post_id)

    if not post:
        return {"message": "Post not found"}

    db.delete(post)
    db.commit()

    return {"message": f"Post with id {post_id} was deleted"}
