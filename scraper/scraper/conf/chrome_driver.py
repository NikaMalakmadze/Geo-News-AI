from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Chrome

from scraper.conf.config import settings, BASE_DIR


def create_chrome_driver(from_file: bool = False) -> Chrome:
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    return Chrome(
        service=Service(executable_path=BASE_DIR / settings.DRIVER_PATH)
        if from_file
        else None,
        options=options,
    )
