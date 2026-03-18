
from pathlib import Path
import json

class HashManager():
    def __init__(self, data_path: Path):
        self.data_path: Path = data_path
        self._total_hashes: set[str] = set()
        self.read_from_file()

    def read_from_file(self) -> None:
        if not self.data_path.exists():
            self.data_path.parent.mkdir(parents=True, exist_ok=True)
            self.data_path.write_text('[]', encoding='utf-8')
            return

        if self.data_path.stat().st_size == 0: return

        with open(self.data_path, 'r', encoding='utf-8') as f:
            data: list[str] = json.load(f)
            self._total_hashes = set(data)

    def write_to_file(self) -> None:
        with open(self.data_path, 'w', encoding='utf-8') as f:
            json.dump(list(self._total_hashes), f, ensure_ascii=False, indent=4)

    def add_hash(self, hash: str) -> None:
        self._total_hashes.add(hash)

    def check_hash(self, hash: str) -> bool:
        return hash in self._total_hashes