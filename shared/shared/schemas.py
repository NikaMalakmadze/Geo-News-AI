from pydantic import BaseModel, Field
from dataclasses import dataclass


class Date(BaseModel):
    year: int
    month: int
    day: int
    hour: int
    minute: int


@dataclass
class PostSource:
    category_url: str
    site_url: str
    site_name: str
    post_url: str


class Post(BaseModel):
    id: str
    title: str
    content: str
    content_raw: str
    category: str
    date_parts: Date
    published_at: str
    source: PostSource
    tags: list[str]


class PostsFile(BaseModel):
    category: str
    posts_count: int
    posts: list[Post]


class AllPostsFile(BaseModel):
    posts_count: int
    posts: list[Post]


class SentimentDistribution(BaseModel):
    mixed: float
    neutral: float
    positive: float
    negative: float


class SentimentRes(BaseModel):
    label: str
    confidence: float
    distribution: SentimentDistribution


class GeorgianSummary(BaseModel):
    model_config = {"populate_by_name": True}

    summary: str = Field(serialization_alias="summaryText")
    organizations: list[str]
    persons: list[str]
    countries: list[str]
    cities: list[str]


class AnalyzeResult(BaseModel):
    category: str
    sentiment: SentimentRes
    keywords: list[str]
    summary: GeorgianSummary
