
from pathlib._local import Path
from random import choice

from shared.schemas import AllPostsFile, PostsFile, Post
from ml.utils.helpers import is_valid_property
from ml.conf.config import BASE_DIR

class DataLoader():
    def __init__(self, data_path: Path, all_file: bool = True) -> None:
        self.data_path = data_path
        self.posts: list[dict] = []
        self.load_data(all_file)

    def load_data(self, all_file: bool) -> None:
        if all_file: self._load_all_file()
        else: self._load_file()

    def get_random_posts(self, count: int) -> list[Post]:
        posts: list[Post] = []
        ids: list[str] = []
        i: int = 0
        while i != count:
            post = choice(self.posts)
            if post['id'] in ids: continue
            ids.append(post['id'])
            posts.append(Post(**post))
            i += 1
        return posts

    def get_data_property(self, property: str) -> list[str]:
        if not is_valid_property(property): return

        property_values: list[str] = []

        for post in self.posts:
            property_values.append(post[property])

        return property_values

    def _load_file(self) -> None:
        with open(BASE_DIR / self.data_path, 'r', encoding='utf-8') as f:
            posts_file: PostsFile = PostsFile.model_validate_json(f.read())
            self.posts = [post.model_dump(mode='python') for post in posts_file.posts]

    def _load_all_file(self) -> None:
        with open(BASE_DIR / self.data_path, 'r', encoding='utf-8') as f:
            posts_file: AllPostsFile = AllPostsFile.model_validate_json(f.read())
            self.posts = [post.model_dump(mode='python') for post in posts_file.posts]
