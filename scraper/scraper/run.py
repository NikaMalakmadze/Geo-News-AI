from scraper.conf.chrome_driver import create_chrome_driver
from scraper.scraper.core.scraper import Scraper
from scraper.conf.config import settings

scraper: Scraper = Scraper(
    driver=create_chrome_driver(),
    base_url=settings.BASE_URL,
    site_url=settings.SITE_URL,
    categories=settings.CATEGORIES,
)

if __name__ == "__main__":
    scraper.get_posts(settings.CATEGORIES.SCIENCE, 20, stop_page=8, output_file=True)
