
from scraper.utils.enums import StructuredEnum

BASE_URL: str = 'https://www.ambebi.ge/category/'
SITE_URL: str = 'https://www.ambebi.ge/'

class Category(StructuredEnum):
    SHOW_BUSINESS = ('kulturashoubiznesis/archive/', 'შოუბიზნესი', 'show_business.json')
    CONFLICTS = ('conflicts/archive/', 'კონფლიქტები', 'conflicts.json')
    SOCIETY = ('sazogadoeba/archive/', 'საზოგადოება', 'society.json')
    ECONOMICS = ('ekonomika/archive/', 'ეკონომიკა', 'economics.json')
    SCIENCE = ('mecniereba/archive/', 'მეცნიერება', 'science.json')
    MILITARY = ('samkhedro/archive/', 'სამხედრო', 'military.json')
    GLOBAL = ('msoplio/archive/', 'მსოფლიო', 'global.json')
    LAW =  ('samartali/archive/', 'სამართალი', 'law.json')
    SPORTS = ('sport/archive/', 'სპორტი', 'sports.json')
