
from pydantic_settings.main import BaseSettings, SettingsConfigDict
from pathlib._local import Path
from functools import lru_cache

BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
	model_config: SettingsConfigDict = SettingsConfigDict(env_file=BASE_DIR / '.env', extra='allow')

	INPUT_PATH: str
	MODELS_PATH: str

	SENTIMENT_MODEL: str
	API_TOKEN: str


@lru_cache
def get_settings() -> Settings:
    return Settings()