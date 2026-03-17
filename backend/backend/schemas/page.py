
from typing import TypeVar, Generic
from pydantic.main import BaseModel
from pydantic.fields import Field
from pydantic import ConfigDict

from backend.enums.category import Category

T = TypeVar('T')

class PageParams(BaseModel):
    page_size: int = Field(default=6, ge=1, le=100)
    page: int = Field(default=1, ge=1)
    category: Category | None = None
    search: str = ''

class PageResponse(BaseModel, Generic[T]):
    model_config: ConfigDict = ConfigDict(from_attributes=True)

    total_items: int = Field(serialization_alias='totalItems', validation_alias='total_items')
    page_size: int = Field(serialization_alias='pageSize', validation_alias='page_size')
    results: list[T]