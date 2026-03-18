
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from pathlib._local import Path
import pickle

class ModelLoader():
    def __init__(self, vectorizer_path: Path, model_path: Path) -> None:
        self.vectorizer_path: Path = vectorizer_path
        self.model_path: Path = model_path
        self._model: LogisticRegression | None = None
        self._vectorizer: TfidfVectorizer | None = None
        self._load_vectorizer()
        self._load_model()

    @property
    def vectorizer(self) -> TfidfVectorizer | None: return self._vectorizer

    @property
    def model(self) -> LogisticRegression | None: return self._model

    def _load_vectorizer(self) -> None:
        if not self.vectorizer_path.is_file():
            raise ValueError("Invalid Path Or File Doesn't Exists")

        with open(self.vectorizer_path, 'rb') as f:
            self._vectorizer = pickle.load(f)

    def _load_model(self) -> None:
        if not self.model_path.is_file():
            raise ValueError("Invalid Path Or File Doesn't Exists")

        with open(self.model_path, 'rb') as f:
            self._model = pickle.load(f)