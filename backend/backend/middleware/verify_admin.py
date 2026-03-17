from fastapi.exceptions import HTTPException
from fastapi.security import APIKeyHeader
from fastapi.params import Security
from fastapi import status
import secrets

from backend.conf.config import Settings, get_settings

settings: Settings = get_settings()

api_key_header = APIKeyHeader(name="X-Admin-Key")


def verify_api_key(key: str = Security(api_key_header)):
    if not secrets.compare_digest(key, settings.API_KEY):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return key
