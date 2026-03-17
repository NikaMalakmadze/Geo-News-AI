
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.engine import create_engine
from typing import Generator, Any

from backend.conf.config import get_settings

settings = get_settings()

engine = create_engine(settings.DATABASE_URL, echo=False)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db() -> Generator[Session, Any, None]:
	try:
		db = sessionLocal()
		yield db
	finally:
		db.close()