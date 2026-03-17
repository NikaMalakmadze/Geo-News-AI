from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from celery.result import AsyncResult
from fastapi import Depends, Request
from sqlalchemy.orm import Session
from fastapi import status
from uuid import uuid4

from backend.schemas.analyze import AnalyzeResponse, AnalyzeGetResponse, AnalyzeInput
from backend.storage.redis_service import get_redis_service, RedisService
from backend.storage.celery_app import analyze_post, celery
from backend.database.models import PostDb, PostDbAnanlyze
from backend.utils.helpers import clean_text, get_post
from backend.conf.limiter import limiter
from backend.database.db import get_db

analyze_router: APIRouter = APIRouter(prefix="/analyze")


@analyze_router.post("/text")
@limiter.limit("5/minute")
async def analyze_text(
    request: Request,
    text: AnalyzeInput,
    redis: RedisService = Depends(get_redis_service),
) -> AnalyzeResponse:
    cleaned_text: str = clean_text(text.input_text)
    if len(cleaned_text) > 3000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="text exceeds maximum length",
        )

    task: AsyncResult = analyze_post.delay(cleaned_text, [])

    task_id: str = str(uuid4())

    await redis.save_task(task_id, task.id, 60 * 10)

    return AnalyzeResponse(message="started", task_id=task_id)


@analyze_router.post("/{post_id}")
@limiter.limit("5/minute")
async def analyze_post_id(
    request: Request,
    post_id: str,
    redis: RedisService = Depends(get_redis_service),
    db: Session = Depends(get_db),
) -> AnalyzeResponse:
    result = await redis.get_post_result(post_id)
    if result:
        return AnalyzeResponse(message="done")

    if await redis.get_task(post_id):
        return AnalyzeResponse(message="processing")

    post: PostDb | None = get_post(db, post_id)

    task: AsyncResult = analyze_post.delay(post.content, post.tags)
    await redis.save_task(post_id, task.id, 60 * 60 * 24)

    return AnalyzeResponse(message="started")


@analyze_router.get("/status/{task_id_param}", response_model_exclude_none=True)
@limiter.limit("30/minute")
async def task_result(
    request: Request,
    task_id_param: str,
    redis: RedisService = Depends(get_redis_service),
    db: Session = Depends(get_db),
) -> AnalyzeGetResponse:
    task_result: dict | None = await redis.get_post_result(task_id_param)
    if task_result:
        return AnalyzeGetResponse(
            result=task_result, response=AnalyzeResponse(message="success")
        )

    task_id: str | None = await redis.get_task(task_id_param)
    if not task_id:
        HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="post was never processed"
        )

    task: AsyncResult = AsyncResult(task_id, app=celery)

    if task.failed():
        await redis.delete_task(task_id_param)
        task.forget()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="task failed"
        )

    if task.successful() and not await redis.get_post_result(task_id):
        analyze_res: AnalyzeGetResponse = AnalyzeGetResponse(
            result=task.result, response=AnalyzeResponse(message="success")
        )

        post: PostDb | None = get_post(db, task_id_param, False)
        if not post:
            return analyze_res

        await redis.save_post_result(task_id_param, task.result, 60 * 60 * 24)

        analyze_model: PostDbAnanlyze = PostDbAnanlyze(
            summary=analyze_res.result.summary.summary,
            sentiment=analyze_res.result.sentiment.label,
            predicted_category=analyze_res.result.category,
            keywords=analyze_res.result.keywords,
            organizations=analyze_res.result.summary.organizations,
            persons=analyze_res.result.summary.persons,
            cities=analyze_res.result.summary.cities,
            countries=analyze_res.result.summary.countries,
            post_id=post.slug,
        )

        if not post.analyze:
            analyze: PostDbAnanlyze = analyze_model
            db.add(analyze)
            db.commit()
        else:
            post.analyze = analyze_model

        return analyze_res

    return AnalyzeGetResponse(
        result=None, response=AnalyzeResponse(message="processing")
    )
