from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

engine = create_engine("sqlite:///cafes.db")
Base = declarative_base()
Base.metadata.reflect(engine)


class Cafe(Base):
    __table__ = Base.metadata.tables["cafe"]
