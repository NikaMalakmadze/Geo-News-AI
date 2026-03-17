from pydantic import ConfigDict, computed_field
from pydantic.main import BaseModel
from pydantic.fields import Field
from datetime import datetime

from backend.constants.mapping import GEORGIAN_MONTHS
from backend.schemas.post import PostDatabaseSchema


class StatCount(BaseModel):
    value: str
    count: int


class PostsByDate(BaseModel):
    date: datetime = Field(exclude=True)
    count: int

    @computed_field
    @property
    def label(self) -> str:
        month = GEORGIAN_MONTHS[self.date.month]
        return f"{self.date.day} {month}"


class EntitiesCount(BaseModel):
    persons: list[StatCount]
    organizations: list[StatCount]
    cities: list[StatCount]
    countries: list[StatCount]


class AnalyzeSchemaBase(BaseModel):
    model_config: ConfigDict = ConfigDict(extra="ignore", from_attributes=True)

    sentiment: str
    predicted_category: str = Field(
        validation_alias="predictedCategory", serialization_alias="predictedCategory"
    )
    summary: str
    keywords: list[str]
    organizations: list[str]
    persons: list[str]
    countries: list[str]
    cities: list[str]


class AnalyzeSchemaGet(AnalyzeSchemaBase):
    post_id: str
    predicted_category: str = Field(
        validation_alias="predicted_category", serialization_alias="predictedCategory"
    )


class StatsResponse(BaseModel):
    category_count: list[StatCount] = Field(
        serialization_alias="categoryCount", validation_alias="category_count"
    )
    predicted_category_count: list[StatCount] = Field(
        serialization_alias="predictedCategoryCount",
        validation_alias="predicted_category_count",
    )
    sentiment_count: list[StatCount] = Field(
        serialization_alias="sentimentCount", validation_alias="sentiment_count"
    )
    keyword_count: list[StatCount] = Field(
        serialization_alias="keywordCount", validation_alias="keyword_count"
    )
    tags_counts: list[StatCount] = Field(
        serialization_alias="tagsCounts", validation_alias="tags_counts"
    )
    total_posts: int = Field(
        serialization_alias="totalPosts", validation_alias="total_posts"
    )
    today_posts_count: int = Field(
        serialization_alias="todayPostsCount", validation_alias="today_posts_count"
    )
    week_posts_count: int = Field(
        serialization_alias="weekPostsCount", validation_alias="week_posts_count"
    )
    analyzes_count: int = Field(
        serialization_alias="analyzesCount", validation_alias="analyzes_count"
    )
    posts_by_days: list[PostsByDate] = Field(
        serialization_alias="postsByDays", validation_alias="posts_by_days"
    )
    entities_count: EntitiesCount = Field(
        serialization_alias="entitiesCount", validation_alias="entities_count"
    )


class AdminPost(PostDatabaseSchema):
    id: int
    created_at: datetime
    analyze: AnalyzeSchemaGet | None
