from flask import Flask, render_template, url_for, jsonify, redirect, abort, request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db_schemas import engine, Cafe
from forms import EditForm
from os import getenv


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
app.config["SECRET_KEY"] = getenv("SECRET_KEY")


@app.route("/")
def home():
    edit_form = EditForm()
    with Session(engine) as session:
        cafes = session.query(Cafe).all()
        return render_template("index.html", cafes=cafes, edit_form=edit_form)


@app.route("/cafe/<int:cafe_id>", methods=["GET", "POST"])
def cafe(cafe_id: int):
    edit_form = EditForm()

    if edit_form.validate_on_submit():
        try:
            with Session(engine) as session:
                edited_cafe = session.query(Cafe).where(Cafe.id == cafe_id).first()
                edited_cafe.name = edit_form.name.data
                edited_cafe.map_url = edit_form.location_url.data
                edited_cafe.img_url = edit_form.img_url.data
                edited_cafe.location = edit_form.location.data
                edited_cafe.has_sockets = edit_form.sockets.data
                edited_cafe.has_toilet = edit_form.bathroom.data
                edited_cafe.has_wifi = edit_form.wifi.data
                edited_cafe.can_take_calls = edit_form.calls.data
                edited_cafe.seats = edit_form.number_of_seats.data
                edited_cafe.coffee_price = edit_form.coffee_price.data

                session.commit()
        except IntegrityError:
            return abort(422, "Non unique cafe name provided.")
        else:
            return redirect(url_for('home'), code=303)

    elif request.method == "POST":
        return abort(422, edit_form.errors)

    else:
        with Session(engine) as session:
            requested_cafe = session.query(Cafe).where(Cafe.id == cafe_id).first()
            return jsonify(cafe=requested_cafe.to_dict())


@app.route("/cafe/all")
def get_all_cafes():
    with Session(engine) as session:
        all_cafes = session.query(Cafe).all()

        return jsonify(cafes=[cafe_obj.to_dict() for cafe_obj in all_cafes])


@app.route("/delete-cafe/<int:cafe_id>")
def delete_cafe(cafe_id: int):
    with Session(engine) as session:
        cafe_obj = session.query(Cafe).where(Cafe.id == cafe_id).first()
        session.delete(cafe_obj)
        session.commit()

        return redirect(url_for("home"), code=303)


@app.route("/add-cafe", methods=["GET", "POST"])
def add_cafe():
    return render_template("add.html")


if __name__ == "__main__":
    app.run(debug=True)
