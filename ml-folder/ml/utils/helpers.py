
from ml.conf.constants import POST_PROPERTIES

def is_valid_property(key: str) -> bool:
    return key in POST_PROPERTIES