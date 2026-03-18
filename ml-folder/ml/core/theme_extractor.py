from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np

class ThemeExtractor():
    def __init__(self, vectorizer: TfidfVectorizer, model: LogisticRegression) -> None:
        self.vectorizer = vectorizer
        self.model = model
        self.feature_names = np.array(vectorizer.get_feature_names_out())

    def get_keywords(
        	self,
        	text: str,
        	tags: list[str] | None = None,
			tags_importance: int = 3,
        	top_n: int = 1
        ) -> list[str]:
        prepared_data: list[str] = self._prepare_data(text, tags, tags_importance)
        transformed_text = self.vectorizer.transform(prepared_data)[0]
        importance = np.argsort(transformed_text.data)[:-(top_n+1):-1]
        keywords: list[str] = list(self.feature_names[transformed_text.indices[importance]])
        return keywords

    def get_category(self, text: str) -> str:
        transformed_text = self.vectorizer.transform([text])
        prediction: list[str] = self.model.predict(transformed_text)
        return prediction[0]

    def _prepare_data(
        	self,
        	text: str,
        	tags: list[str] | None = None,
			tags_importance: int = 3
        ) -> list[str]:
        prepared: str = text + (f" {' '.join(tags*tags_importance)}" if tags else '')
        return [prepared]
