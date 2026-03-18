
from enum import Enum

class StructuredEnum(Enum):
    def __init__(self, path: str, label: str, output: str):
        self._path = path
        self._label = label
        self._output = output

    @property
    def path(self) -> str: return self._path

    @property
    def label(self) -> str: return self._label

    @property
    def output(self) -> str: return self._output