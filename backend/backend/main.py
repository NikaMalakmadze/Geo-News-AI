
from fastapi.applications import FastAPI

from backend import create_app

app: FastAPI = create_app()