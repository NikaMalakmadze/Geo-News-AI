
from pydantic import BaseModel, Field

from shared.schemas import AnalyzeResult

class AnalyzeInput(BaseModel):
    input_text: str

class AnalyzeResponse(BaseModel):
    task_id: str | None = Field(default=None, serialization_alias='taskId', validation_alias='task_id')
    message: str | None = None

class AnalyzeGetResponse(BaseModel):
    result: AnalyzeResult | None
    response: AnalyzeResponse