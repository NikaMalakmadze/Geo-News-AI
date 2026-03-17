
from redis.asyncio import Redis
from typing import Any

from backend.storage.redis import redis

class RedisService():
    def __init__(self, redis: Redis) -> None:
        self.redis = redis

    async def save_task(self, id: str, task_id: str, ex: int | None = None) -> None:
        await self.redis.set(f'tasks:{id}', task_id, ex)

    async def delete_task(self, id: str) -> None:
        await self.redis.delete(f'tasks:{id}')

    async def get_task(self, id: str) -> str | None:
        result: bytes = await self.redis.get(f'tasks:{id}')
        return result.decode() if result else None

    async def save_post_result(self, id: str, result: dict[str, Any], ex: int | None = None) -> None:
        import json
        await self.redis.set(f'results:{id}', json.dumps(result), ex)

    async def get_post_result(self, id: str) -> dict[str, Any] | None:
        import json
        result: bytes = await self.redis.get(f'results:{id}')
        return json.loads(result) if result else None

def get_redis_service() -> RedisService: return RedisService(redis)
