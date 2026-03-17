from pydantic import ConfigDict, BaseModel, Field
from datetime import datetime

from shared.schemas import Date, PostSource


class PostB(BaseModel):
    model_config: ConfigDict = ConfigDict(extra="ignore")

    id: str
    title: str
    content_raw: str = Field(serialization_alias="content")
    category: str
    date_parts: Date
    source: PostSource
    tags: list[str]


class PostsDatabaseSchema(BaseModel):
    model_config: ConfigDict = ConfigDict(extra="ignore", from_attributes=True)

    slug: str
    title: str
    content_raw: str = Field(serialization_alias="content")
    category: str
    date_parts: Date
    tags: list[str]

    source: PostSource
    published_at: datetime


class PostAnalyzeDateShema(BaseModel):
    model_config: ConfigDict = ConfigDict(extra="ignore", from_attributes=True)

    updated_at: datetime = Field(
        serialization_alias="updatedAt", validation_alias="updated_at"
    )


class PostDatabaseSchema(PostsDatabaseSchema):
    analyze: PostAnalyzeDateShema | None


class PostCategory(BaseModel):
    label: str
    value: str


class PostCategoriesResSchema(BaseModel):
    categories: list[PostCategory]
    categories_count: int = Field(
        serialization_alias="categoriesCount", validation_alias="categories_count"
    )


class AnalyzeSchemaSaved(BaseModel):
    model_config: ConfigDict = ConfigDict(extra="ignore", from_attributes=True)

    sentiment: str
    predicted_category: str = Field(
        validation_alias="predicted_category", serialization_alias="predictedCategory"
    )
    summary: str
    keywords: list[str]
    organizations: list[str]
    persons: list[str]
    countries: list[str]
    cities: list[str]
