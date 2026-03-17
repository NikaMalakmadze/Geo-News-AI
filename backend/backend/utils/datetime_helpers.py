from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

def current_day_range() -> tuple[datetime, datetime]:
    now: datetime = datetime.now(ZoneInfo('Asia/Tbilisi'))
    start: datetime = now.replace(hour=0, minute=0, second=0, microsecond=0)
    end: datetime = start + timedelta(days=1)
    return start, end

def current_week_range() -> tuple[datetime, datetime]:
    now: datetime = datetime.now(ZoneInfo('Asia/Tbilisi'))
    start: datetime = (now - timedelta(days=now.weekday())).replace(
		hour=0, minute=0, second=0, microsecond=0
	)
    end: datetime = start + timedelta(days=7)
    return start, end