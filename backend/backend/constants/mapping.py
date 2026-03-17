from backend.enums.category import Category

GEORGIAN_MONTHS = {
    1: "იან",
    2: "თებ",
    3: "მარ",
    4: "აპრ",
    5: "მაი",
    6: "ივნ",
    7: "ივლ",
    8: "აგვ",
    9: "სექ",
    10: "ოქტ",
    11: "ნოე",
    12: "დეკ",
}

CATEGORY_GE_MAP: dict[Category, str] = {
    Category.SHOW_BUSINESS: "შოუბიზნესი",
    Category.CONFLICTS: "კონფლიქტები",
    Category.SOCIETY: "საზოგადოება",
    Category.ECONOMICS: "ეკონომიკა",
    Category.SCIENCE: "მეცნიერება",
    Category.MILITARY: "სამხედრო",
    Category.GLOBAL: "მსოფლიო",
    Category.LAW: "სამართალი",
    Category.SPORTS: "სპორტი",
}

GEO_TO_EN_CATEGORY_MAP: dict[str, str] = {
    "შოუბიზნესი": "show_business",
    "კონფლიქტები": "conflicts",
    "საზოგადოება": "society",
    "ეკონომიკა": "economics",
    "მეცნიერება": "science",
    "სამხედრო": "military",
    "მსოფლიო": "global",
    "სამართალი": "law",
    "სპორტი": "sports",
}