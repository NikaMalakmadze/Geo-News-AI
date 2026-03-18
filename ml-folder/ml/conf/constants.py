
from shared.schemas import Post

post_keys: list[str] = list(Post.model_fields.keys())
post_keys.remove('id')
post_keys.remove('date_parts')

POST_PROPERTIES: set[str] = set(post_keys)