from fastapi.exceptions import HTTPException
from fastapi import Depends, Request, status
from sqlalchemy.orm import Session, Query
from fastapi.routing import APIRouter

from backend.schemas.post import (
    AnalyzeSchemaSaved,
    PostDatabaseSchema,
    PostsDatabaseSchema,
    PostCategoriesResSchema,
    PostCategory,
)
from backend.constants.mapping import GEO_TO_EN_CATEGORY_MAP
from backend.schemas.page import PageParams, PageResponse
from backend.utils.paginate import paginate
from backend.database.models import PostDb
from backend.conf.limiter import limiter
from backend.database.db import get_db

posts_router: APIRouter = APIRouter(prefix="/posts")


@posts_router.get("/", response_model=PageResponse[PostsDatabaseSchema])
@limiter.limit("100/minute")
async def get_posts(
    request: Request, page_params: PageParams = Depends(), db: Session = Depends(get_db)
) -> PageResponse[PostsDatabaseSchema]:
    query: Query[PostDb] = db.query(PostDb)

    return paginate(page_params, query, PostsDatabaseSchema)


@posts_router.get("/{slug}", response_model=PostDatabaseSchema)
@limiter.limit("15/minute")
async def get_post(
    request: Request, slug: str, db: Session = Depends(get_db)
) -> PostDatabaseSchema:
    post_db: PostDb = db.query(PostDb).filter_by(slug=slug).first()
    if not post_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return PostDatabaseSchema.model_validate(post_db)


@posts_router.get("/analyze/{slug}", response_model=AnalyzeSchemaSaved)
@limiter.limit("15/minute")
async def get_post_analyze(
    request: Request, slug: str, db: Session = Depends(get_db)
) -> AnalyzeSchemaSaved:
    post_db: PostDb = db.query(PostDb).filter_by(slug=slug).first()
    if not post_db or not post_db.analyze:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return AnalyzeSchemaSaved.model_validate(post_db.analyze)


@posts_router.get("/categories/")
@limiter.limit("100/minute")
async def get_cateogories(
    request: Request, db: Session = Depends(get_db)
) -> PostCategoriesResSchema:
    post_categories = (
        db.query(PostDb.category).distinct().order_by(PostDb.category).all()
    )

    structured_categories: list[PostCategory] = [
        PostCategory(label=c[0], value=GEO_TO_EN_CATEGORY_MAP[c[0]])
        for c in post_categories
    ]

    return PostCategoriesResSchema(
        categories=structured_categories, categories_count=len(structured_categories)
    )
