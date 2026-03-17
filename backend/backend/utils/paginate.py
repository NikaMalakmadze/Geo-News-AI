from pydantic.main import BaseModel
from sqlalchemy.orm import Query
from sqlalchemy import or_

from backend.database.models import PostDb, PostDbAnanlyze
from backend.schemas.page import PageParams, PageResponse
from backend.constants.mapping import CATEGORY_GE_MAP


def paginate(
    page_param: PageParams, query: Query, ResponseSchema: BaseModel
) -> PageResponse:
    if page_param.category:
        query = query.filter_by(category=CATEGORY_GE_MAP[page_param.category])

    search: str = page_param.search.strip().replace("-", "")

    if page_param.search:
        query = query.outerjoin(PostDbAnanlyze).filter(
            or_(
                PostDb.title.ilike(f"%{search}%"),
                PostDb.content_raw.ilike(f"%{search}%"),
                PostDb.category.ilike(f"%{search}%"),
                PostDbAnanlyze.sentiment.ilike(f"%{search}%"),
            )
        )

    query = query.order_by(PostDb.published_at.desc())

    total_items = query.count()

    paginated_query = (
        query.offset((page_param.page - 1) * page_param.page_size)
        .limit(page_param.page_size)
        .all()
    )

    return PageResponse(
        total_items=total_items,
        page_size=page_param.page_size,
        results=[ResponseSchema.model_validate(item) for item in paginated_query],
    )
