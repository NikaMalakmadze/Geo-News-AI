
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from uuid import uuid5, NAMESPACE_URL
from string import punctuation
import re

from shared.schemas import Date

def clean_text(text: str) -> str:
    text = re.sub(r'\[IMAGE:.*?\]', '', text)
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', punctuation.replace('-', '')))
    text = text.replace('\u00ad', '').replace('\u200b', '').replace('\u200c', '').replace('\u200d', '')
    text = text.replace('\n', ' ')
    return text

def process_post_id(site: str, published_at: str, url: str) -> str:
    url = (url
        .lower()
        .split('/')[-2]
        .translate(str.maketrans('', '', '0123456789-'))
    )
    site = site.lower()
    return str(uuid5(NAMESPACE_URL, f'{site}|{published_at}|{url}'))

def process_date(date_str: str) -> Date:
	time, date = date_str.replace(' ', '').split('/')

	hours, minutes = list(map(int, time.split(':')))

	day, month, year = list(map(int, date.split('-')))

	return Date(
    	minute=minutes,
		hour=hours,
		day=day,
		month=month,
		year=year
    )

def proccess_content(content_elements: list[WebElement]) -> str:
    content: str = ''
    for content_element in content_elements[:-1]:
        images: list[WebElement] = content_element.find_elements(By.TAG_NAME, 'img')
        for image in images:
            src: str | None = image.get_attribute('src')
            if src:
                content += f'[IMAGE:{src}]\n'
        content += f'{content_element.text.strip()}\n\n'
    return content.strip()

def proccess_tags(tags_elements: list[WebElement]) -> list[str]:
	return [clean_text(tag_element.text) for tag_element in tags_elements]
