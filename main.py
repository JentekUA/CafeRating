from flask import Flask, render_template, url_for
from sqlalchemy.orm import Session
from db_schemas import engine, Cafe


app = Flask(__name__)


@app.route("/")
def home():
    with Session(engine) as session:
        cafes = session.query(Cafe).all()
        return render_template("index.html", cafes=cafes)


if __name__ == "__main__":
    app.run(debug=True)
