
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from typing import Any, Type

from scraper.utils.helpers import write_json_output, is_stop_page, validated_data, generate_str_time, generate_hash
from scraper.utils.process_data import process_date, proccess_content, proccess_tags, process_post_id, clean_text
from shared.schemas import PostsFile, Post, PostSource, Date
from scraper.utils.validators import GetPostValidator
from scraper.core.output_manager import OutputManager
from scraper.conf.config import settings, BASE_DIR
from scraper.core.hash_manager import HashManager
from scraper.conf.constants import Category
from scraper.utils.logger import logger

class Scraper():
    def __init__(
        self,
        driver: WebDriver,
        base_url: str,
        site_url: str,
        categories: Type[Category],
        use_hash_manager: bool = True
    ) -> None:
        self.driver = driver
        self.base_url = base_url
        self.site_url = site_url
        self.categories = categories
        self.site = base_url.removeprefix('https://www.').split('/')[0]
        self.hash_manager: HashManager | None = HashManager(BASE_DIR / settings.DATA_PATH) if use_hash_manager else None
        self.output_manager: OutputManager = OutputManager(BASE_DIR / settings.OUTPUT_PATH, self.categories)
        self.wait = WebDriverWait(driver, 10)

        self._current_category: Category | None = None
        self._current_page: int | None = None
        self._total_posts: list[Post] = []

    def merge_posts(self, file_name: str = 'data') -> None: self.output_manager.merge_files(file_name)

    def get_posts(
            self,
            category: Type[Category],
            per_page: int,
            start_page: int = 1,
            stop_page: int | None = None,
            output_file: bool = False
        ) -> list[Post] | None:
        if not validated_data({ 'category': category, 'per_page': per_page, 'start_page': start_page, 'stop_page': stop_page }, GetPostValidator): return

        self._current_page = start_page
        try:
            logger.info('Started Scraping Posts')
            self._get_posts(category, per_page, stop_page, output_file)
        except KeyboardInterrupt:
            if output_file:
                logger.info('Turned Off')
                if self.hash_manager: self.hash_manager.write_to_file()
                self._serialize()
                return

        return self._total_posts

    def _get_posts(
            self,
            category: Type[Category],
            per_page: int,
            stop_page: int | None = None,
            output_file: bool = False
        ) -> None:
        logger.info(f'Scraping Posts On Category {category}')
        self._current_category = category
        self.driver.maximize_window()

        while True:
            if is_stop_page(self._current_page, stop_page): break

            url: str = f'{self.base_url}{self._current_category.path}?page={self._current_page}'

            posts_on_page: list[Post] = self._scrape_posts(url, per_page)
            if not posts_on_page: break

            self._current_page += 1
            self._total_posts.extend(posts_on_page)

        logger.info('Ended Scraping Posts')

        if output_file:
            if self.hash_manager: self.hash_manager.write_to_file()
            self._serialize()
            logger.info('Posts Serialized Successfuly')

    def _scrape_posts(self, url: str, per_page: int) -> list[Post] | None:
        driver: WebDriver = self.driver

        driver.get(url)

        try: post_elements: list[WebElement] = self.wait.until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.maintopnewstitle a'))
            )
        except TimeoutException: return

        posts: list[Post] = []
        for i, element in enumerate(post_elements[:per_page]):
            try:
                logger.info(f'Page: {url} | Page N{self._current_page} Post N{i + 1}')
                post: Post | str = self._scrape_post(element)
                if post == 'skipped': continue
                if post == 'visited': break
                posts.append(post)
            except Exception:
                logger.error(f'Page: {url} | Page N{self._current_page} Post N{i + 1} | Skipping')
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                continue
        return posts

    def _scrape_post(self, element: WebElement) -> Post | str:
        driver: WebDriver = self.driver

        driver.execute_script("window.open(arguments[0].href, '_blank');", element)
        driver.switch_to.window(driver.window_handles[-1])

        post_wrapper: WebElement = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.article_detail_fullin .containerin'))
        )

        if self.hash_manager:
            post_hash: str = generate_hash(driver.current_url)
            if self.hash_manager.check_hash(post_hash): return 'visited'
            self.hash_manager.add_hash(post_hash)

        post_image: str | None = post_wrapper.find_element(By.CSS_SELECTOR, '.containerarticle.lua1 .article_image img').get_attribute('src')

        post_title: str = post_wrapper.find_element(By.CSS_SELECTOR, '.containerarticle.lua1 .article_title.sa').text

        post_date_str: str = post_wrapper.find_element(By.CSS_SELECTOR, '.containerarticle.lua1 .article_date').text

        post_content_wrapper: WebElement = post_wrapper.find_element(By.CSS_SELECTOR, '.containerarticle.lua1 .article_block .inner-content')
        if not post_content_wrapper: return 'skipped'

        post_content_p_tags: list[WebElement] = post_content_wrapper.find_elements(By.TAG_NAME, 'p')

        post_tags_elements: list[WebElement] = post_wrapper.find_elements(By.CSS_SELECTOR, '.containerarticle.lua1 .article_tagitem')

        post_content_raw: str = proccess_content(post_content_p_tags)
        if not post_content_raw: return 'skipped'

        if post_image:
            post_content_raw = f'[IMAGE:{post_image}]\n' + post_content_raw

        post_date: Date = process_date(post_date_str)
        post_source: PostSource = PostSource(
            category_url=self.base_url+self._current_category.path,
            site_url=self.site_url,
            site_name=self.site,
            post_url=driver.current_url
        )
        post_published_at: str = generate_str_time(
            year=post_date.year,
            month=post_date.month,
            day=post_date.day,
            hour=post_date.hour,
            minute=post_date.minute,
        )

        post: Post = Post(
            id=process_post_id(self.site, post_published_at, driver.current_url),
            published_at=post_published_at,
            date_parts=post_date,
            title=post_title,
            content=clean_text(post_content_raw),
            content_raw=post_content_raw,
            category=self._current_category.label,
            tags=proccess_tags(post_tags_elements),
            source=post_source
        )

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

        return post

    def _serialize(self) -> None:
        posts: list[dict[str, Any]] = [post.model_dump(mode='json') for post in self._total_posts]

        output: dict[str, Any] = PostsFile(
            category=self._current_category.label,
            posts_count=len(posts),
            posts=posts
        ).model_dump(mode='json')

        write_json_output(output, BASE_DIR / settings.OUTPUT_PATH / self._current_category.output)