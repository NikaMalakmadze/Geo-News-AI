from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager
from fastapi.applications import FastAPI
from slowapi import _rate_limit_exceeded_handler

from backend.database.db_init import create_tables
from backend.routes.analyze import analyze_router
from backend.routes.admin import admin_router
from backend.routes.posts import posts_router
from backend.conf.limiter import limiter
from backend.conf.cors import ORIGINS


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


def create_app() -> FastAPI:

    app: FastAPI = FastAPI(lifespan=lifespan)
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(analyze_router)
    app.include_router(posts_router)
    app.include_router(admin_router)

    return app
