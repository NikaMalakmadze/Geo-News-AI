
from pydantic_settings.main import SettingsConfigDict
from pydantic_settings import BaseSettings
from pathlib import Path
from typing import Type

from scraper.conf.constants import BASE_URL, SITE_URL, Category

BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    model_config: SettingsConfigDict = SettingsConfigDict(env_file=BASE_DIR / '.env')

    DRIVER_PATH: str
    OUTPUT_PATH: str
    DATA_PATH: str

    BASE_URL: str = BASE_URL
    SITE_URL: str = SITE_URL
    CATEGORIES: Type[Category] = Category

settings: Settings = Settings()
