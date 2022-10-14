from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

engine = create_engine("sqlite:///cafes.db")
Base = declarative_base()
Base.metadata.reflect(engine)


class Cafe(Base):
    __table__ = Base.metadata.tables["cafe"]

    def to_dict(self):
        return {"id": self.id,
                "name": self.name,
                "map_url": self.map_url,
                "img_url": self.img_url,
                "location": self.location,
                "has_sockets": self.has_sockets,
                "has_toilet": self.has_toilet,
                "has_wifi": self.has_wifi,
                "can_take_calls": self.can_take_calls,
                "seats": self.seats,
                "coffee_price": self.coffee_price}
