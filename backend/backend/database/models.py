from sqlalchemy import Column, DateTime, Integer, String, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database.db import Base


class PostDb(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text)
    content_raw = Column(Text)
    content = Column(Text)
    category = Column(String, index=True)
    date_parts = Column(JSON)
    tags = Column(JSON)

    source = Column(JSON)

    slug = Column(String, unique=True, index=True)
    published_at = Column(DateTime, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    analyze = relationship(
        "PostDbAnanlyze",
        back_populates="post",
        uselist=False,
        cascade="all, delete-orphan",
        single_parent=True,
    )


class PostDbAnanlyze(Base):
    __tablename__ = "postsAnalyzes"

    id = Column(Integer, primary_key=True, index=True)
    sentiment = Column(String, index=True)
    predicted_category = Column(String, index=True)
    summary = Column(Text)
    keywords = Column(JSON)
    organizations = Column(JSON)
    persons = Column(JSON)
    countries = Column(JSON)
    cities = Column(JSON)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    post_id = Column(
        String,
        ForeignKey("posts.slug", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    post = relationship("PostDb", back_populates="analyze")
