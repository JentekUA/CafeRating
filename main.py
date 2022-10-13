from flask import Flask, render_template, url_for, request, jsonify
from sqlalchemy.orm import Session
from db_schemas import engine, Cafe


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route("/")
def home():
    with Session(engine) as session:
        cafes = session.query(Cafe).all()
        return render_template("index.html", cafes=cafes)


@app.route("/cafe/<int:cafe_id>", methods=["GET", "PATCH"])
def cafe(cafe_id: int):
    if request.method == "PATCH":
        pass
    else:
        with Session(engine) as session:
            requested_cafe = session.query(Cafe).where(Cafe.id == cafe_id).first()
            return jsonify(cafe=requested_cafe.to_dict())


if __name__ == "__main__":
    app.run(debug=True)
