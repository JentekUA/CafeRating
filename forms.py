from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import URL, Regexp, DataRequired


class EditForm(FlaskForm):
    name = StringField(name="name")
    location = StringField(name="location")
    location_url = StringField(name="location-url")
    img_url = StringField(name="img-url")
    sockets = BooleanField(name="sockets")
    wifi = BooleanField(name="wifi")
    calls = BooleanField(name="calls")
    bathroom = BooleanField(name="bathroom")
    coffee_price = StringField(name="coffee-price")
    number_of_seats = StringField(name="number-of-seats")
