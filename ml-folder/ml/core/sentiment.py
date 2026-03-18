from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

from shared.schemas import SentimentRes, SentimentDistribution

class Sentiment():
    def __init__(self, model_name: str) -> None:
        self.model_name = model_name
        self.tokenizer: AutoTokenizer = self._load_tokenizer()
        self.model: AutoModelForSequenceClassification = self._load_model()

    def get_sentiment(self, text: str) -> SentimentRes:
        inputs = self.tokenizer(
    		text,
    		return_tensors="pt",
    		truncation=True,
    		padding=True
		)

        with torch.no_grad():
            outputs = self.model(**inputs)

        probs = torch.softmax(outputs.logits / 2, dim=1)[0]

        id2label = self.model.config.id2label

        scores: dict[str, float] = {
            id2label[i].lower(): round(probs[i].item() * 100, 2)
            for i in range(len(probs))
        }

        predicted_label: str = max(scores, key=scores.get)

        return SentimentRes(
            label=predicted_label,
            confidence=scores[predicted_label],
            distribution=SentimentDistribution(**scores)
        )

    def _load_tokenizer(self) -> AutoTokenizer:
        return AutoTokenizer.from_pretrained(self.model_name)

    def _load_model(self) -> AutoModelForSequenceClassification:
        return AutoModelForSequenceClassification.from_pretrained(self.model_name)