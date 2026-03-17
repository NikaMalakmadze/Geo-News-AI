from ml.conf.config import get_settings, BASE_DIR, Settings
from shared.schemas import SentimentRes, AnalyzeResult
from ml.core.theme_extractor import ThemeExtractor
from ml.core.model_loader import ModelLoader
from ml.core.summerize import Summerizer
from ml.core.sentiment import Sentiment

settings: Settings = get_settings()


class MlService:
    def __init__(self) -> None:
        loader: ModelLoader = ModelLoader(
            BASE_DIR / settings.MODELS_PATH / "vectorizer.pkl",
            BASE_DIR / settings.MODELS_PATH / "model.pkl",
        )

        self.vecorizer = loader.vectorizer
        self.model = loader.model
        self.sentiment: Sentiment = Sentiment(settings.SENTIMENT_MODEL)
        self.theme_extractor: ThemeExtractor = ThemeExtractor(
            self.vecorizer, self.model
        )
        self.summerizer: Summerizer = Summerizer(
            "https://openrouter.ai/api/v1/chat/completions", settings.API_TOKEN
        )

    def analyze(self, text: str, tags: list[str] | None = None) -> AnalyzeResult:
        category: str = self.theme_extractor.get_category(text)

        sentiment: SentimentRes = self.sentiment.get_sentiment(text)

        keywords: list[str] = self.theme_extractor.get_keywords(text, tags, top_n=5)

        summary = self.summerizer.summerize(text, "openrouter/hunter-alpha")

        return AnalyzeResult(
            category=category, sentiment=sentiment, keywords=keywords, summary=summary
        )


def get_ml() -> MlService:
    return MlService()
