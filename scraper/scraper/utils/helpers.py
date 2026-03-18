
from pydantic import ValidationError
from pydantic.main import BaseModel
from datetime import datetime
from hashlib import sha256
from pathlib import Path
from typing import Any
import json

def validated_data(data: dict[str, Any], validator: BaseModel) -> bool:
    try:
        validator(**data)
    except ValidationError:
        return False
    return True

def generate_str_time(year: int, month: int, day: int, hour: int, minute: int) -> str:
    date_obj: datetime = datetime(
        year=year,
        month=month,
        day=day,
        hour=hour,
        minute=minute
    )
    return date_obj.strftime('%Y-%m-%dT%H%M')

def generate_hash(value: str) -> str:
    return sha256(value.encode()).hexdigest()

def is_stop_page(current_page: int, stop_page: int | None) -> bool:
    return stop_page and current_page == stop_page

def write_json_output(output_data: dict[str, Any], output_file_path: Path) -> None:
    with open(output_file_path, 'w', encoding='utf-8') as f:
       json.dump(output_data, f, ensure_ascii=False, indent=4)
