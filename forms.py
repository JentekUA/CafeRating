from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import URL, Regexp, DataRequired


class CafeForm(FlaskForm):
    name = StringField(name="name", validators=[DataRequired()])
    location = StringField(name="location", validators=[DataRequired()])
    location_url = StringField(name="location-url", validators=[DataRequired(), URL()])
    img_url = StringField(name="img-url", validators=[DataRequired(), URL()])
    sockets = BooleanField(name="sockets")
    wifi = BooleanField(name="wifi")
    calls = BooleanField(name="calls")
    bathroom = BooleanField(name="bathroom")
    coffee_price = StringField(
        name="coffee-price",
        validators=[
            DataRequired(),
            Regexp(r"^\W\d[0-9]*\.\d{2}$", message="Price must be in a format: [currency character]d.dd.")
        ])
    number_of_seats = StringField(
        name="number-of-seats",
        validators=[
            DataRequired(),
            Regexp(r"^[^a-zA-z]+$", message="Only digits and special characters allowed.")])
