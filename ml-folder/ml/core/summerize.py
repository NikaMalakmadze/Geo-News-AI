
from requests.models import Response
from typing import Any
import requests

from shared.schemas import GeorgianSummary

class Summerizer():
    def __init__(self, api_url: str,  hf_api_token: str) -> None:
        self.api_url = api_url
        self.hf_api_token = hf_api_token

    @property
    def headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {self.hf_api_token}",
            "Content-Type": "application/json"
        }

    @property
    def response_format(self) -> dict[str, str | dict]:
        return {
            "type": "json_schema",
            "json_schema": {
                "name": "GeorgianSummary",
                "schema": GeorgianSummary.model_json_schema(),
                "strict": True
            }
        }

    def summerize(self, text: str, model_id: str) -> GeorgianSummary | None:
        payload = self._construct_payload(text, model_id)

        response: Response = requests.post(
            url=self.api_url,
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        result_json = response.json()

        print(result_json)
        raw_content = result_json['choices'][0]['message']['content'].strip()
        print(raw_content)
        structured_data = GeorgianSummary.model_validate_json(raw_content)

        return structured_data

    def _construct_payload(self, text: str, model_id: str) -> dict[str, Any]:
        return {
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are a Georgian news analysis assistant.\n"
                        "You MUST return a response that is a VALID JSON object and STRICTLY matches the following JSON Schema.\n\n"
                        "Any extra keys, missing keys, comments, or text outside the JSON object are FORBIDDEN.\n\n"
                        "JSON Schema:\n"
                        "{\n"
                        '  "summary": "string, 1–3 concise Georgian sentences, at least 5× shorter than the original",\n'
                        '  "organizations": ["string"],\n'
                        '  "persons": ["string"],\n'
                        '  "countries": ["string"],\n'
                        '  "cities": ["string"]\n'
                        "}\n\n"
                        "Instructions:\n"
                        "- Summarize the text in 1–3 concise Georgian sentences.\n"
                        "- The summary must be at least 5× shorter than the original.\n"
                        "- Extract persons, organizations, countries, and cities mentioned.\n"
                        "- Do NOT include any extra text outside the JSON.\n"
                )
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            "model": model_id,
            "response_format": self.response_format
        }
