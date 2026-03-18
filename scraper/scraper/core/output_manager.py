
from pathlib._local import Path
from typing import Type, Any
import json

from scraper.conf.constants import Category
from shared.schemas import PostsFile, Post

class OutputManager():
    def __init__(self, output_folder: Path, categories: Type[Category]) -> None:
        self.output_folder = output_folder
        self._categories = categories

    def merge_files(self, file_name: str = 'data') -> None:
        posts: list[Post] = []
        posts_count: int = 0
        for item in self.output_folder.iterdir():
            if item.is_file() and item.name != 'data.json':
                file_posts, count = self.process_file(item)
                posts.extend(file_posts)
                posts_count += count

        if posts_count == 0: return

        posts: list[dict[str, Any]] = [post.model_dump(mode='json') for post in posts]

        self._serialize(
            self.output_folder / f'{file_name}.json',
            { "posts_count": posts_count, "posts": posts }
        )

    def process_file(self, path: Path) -> tuple[list[Post], int]:
        if path.stat().st_size == 0: return [], 0

        with open(path, 'r', encoding='utf-8') as f:
            posts_file: PostsFile = PostsFile.model_validate_json(f.read())
        return posts_file.posts, posts_file.posts_count

    def _serialize(self, path: str, content: dict[str, Any]) -> None:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=4)