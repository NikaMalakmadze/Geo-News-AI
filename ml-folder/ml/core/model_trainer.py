
from sklearn.metrics import accuracy_score, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from scipy.sparse import spmatrix
from pathlib._local import Path
import pickle

from ml.core.data_loader import DataLoader

class ModelTrainer():
    def __init__(
            self,
            data_path: Path,
            vectorizer_out_path: Path | None = None,
            model_out_path: Path | None = None,
            is_all_file: bool = True
        ) -> None:
        self.data_loader: DataLoader = DataLoader(data_path, is_all_file)
        self.vectorizer_out_path: Path = vectorizer_out_path
        self.model_out_path: Path = model_out_path
        self.contents: list[str] = self.data_loader.get_data_property('content')
        self.categories: list[str] = self.data_loader.get_data_property('category')

    def model_fitter(self) -> tuple[TfidfVectorizer, LogisticRegression, list[str], list[str]]:
        X_train, X_test, y_train, y_test = train_test_split(
            self.contents,
            self.categories,
            shuffle=True,
            train_size=0.8
        )

        vectorizer: TfidfVectorizer = TfidfVectorizer()
        vectorized_train_contents: spmatrix = vectorizer.fit_transform(X_train)

        model: LogisticRegression = LogisticRegression()
        model.fit(vectorized_train_contents, y_train)

        if self.vectorizer_out_path: self._save_fitted_vectorizer(vectorizer)
        if self.model_out_path: self._save_fitted_model(model)

        return vectorizer, model, X_test, y_test

    def test_model(
            self,
            vectorizer: TfidfVectorizer,
            model: LogisticRegression,
            X_test: list[str],
            y_test: list[str]
        ) -> None:
        result: spmatrix = vectorizer.transform(X_test)
        prediction = model.predict(result)

        accuracy: float = accuracy_score(y_test, prediction) * 100

        report = classification_report(y_test, prediction)

        print(f'Logistic Regression model accuracy: {accuracy:.2f}%')
        print(report)

    def _save_fitted_model(self, model: LogisticRegression) -> None:
        with open(self.model_out_path, 'wb') as f:
            pickle.dump(model, f)

    def _save_fitted_vectorizer(self, vectorizer: TfidfVectorizer) -> None:
        with open(self.vectorizer_out_path, 'wb') as f:
            pickle.dump(vectorizer, f)