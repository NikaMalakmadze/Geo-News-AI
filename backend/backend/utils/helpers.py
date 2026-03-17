
from fastapi.exceptions import HTTPException
from sqlalchemy import func, Row, Column
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from string import punctuation
from fastapi import status
from typing import Any
import re

from backend.schemas.admin import PostsByDate
from backend.schemas.admin import StatCount
from backend.database.models import PostDb

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', punctuation.replace('-', '')))
    text = text.replace('\u00ad', '').replace('\u200b', '').replace('\u200c', '').replace('\u200d', '')
    text = text.replace('\n', ' ')
    return text

def get_post(db: Session, post_id: str, raise_exception: bool = True) -> PostDb | None:
    post: PostDb | None = db.query(PostDb).filter_by(slug=post_id).first()
    if not post and raise_exception: raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="invalid post id"
    )
    return post

def str_property_count(db: Session, count_property: Column[str], count_by: Column[str]) -> list[StatCount]:
    property_rows: list[Row[tuple[str, int]]] = (
        db.query(
            count_property.label('name'),
            func.count(count_by).label('value')
        )
        .group_by(count_property)
        .order_by(func.count(count_by).desc())
        .all()
    )
    property_counts: list[StatCount] = [
        StatCount(value=row.name, count=row.value)
        for row in property_rows
        if row.name is not None
    ]
    return property_counts

def json_array_top_values(db: Session, array_property: Column[Any], limit: int) -> list[StatCount]:
    top_values: list[tuple[str, int]] = (
        db.query(
            func.json_array_elements_text(array_property).label('value'),
            func.count().label('count')
        )
        .group_by('value')
        .order_by(func.count().desc())
        .limit(limit)
        .all()
    )
    return [StatCount(value=value, count=count) for value, count in top_values]

def post_count_in_date_range(db: Session, date_range: tuple[datetime, datetime]) -> int:
    return (
        db.query(PostDb)
        .filter(PostDb.created_at >= date_range[0])
        .filter(PostDb.created_at < date_range[1])
        .count()
    )

def posts_by_days(db: Session, date_range: tuple[datetime, datetime]) -> list[PostsByDate]:
    tbilisi_day = func.date(func.timezone('Asia/Tbilisi', PostDb.created_at))

    days = (date_range[1] - date_range[0]).days

    post_by_days_rows: list[Row[tuple[str, int]]] = (
        db.query(
            tbilisi_day.label("day"),
            func.count(PostDb.slug).label('value')
        )
        .filter(tbilisi_day >= date_range[0])
        .filter(tbilisi_day < date_range[1])
        .group_by(tbilisi_day)
        .order_by(tbilisi_day.asc())
        .limit(days)
        .all()
    )

    posts_count_by_range: list[PostsByDate] = []
    today = datetime.now().date()

    for day in range(days - 1, -1, -1):
        date = today - timedelta(days=day)
        count: int = next((row.value for row in post_by_days_rows if row.day == date), 0)
        posts_count_by_range.append(PostsByDate(date=date, count=count))

    return posts_count_by_range