from pydantic.main import BaseModel
from pydantic.fields import Field

from scraper.conf.constants import Category

class GetPostValidator(BaseModel):
    category: Category
    per_page: int = Field(ge=1, le=20)
    start_page: int = Field(ge=1)
    stop_page: int | None = Field(ge=2)