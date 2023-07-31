#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import *
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os

# Local imports
from config import app, db, api
from models import User, Card, Deck, Banlist, BanlistCard 

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def home():
    return 'testing base'

@app.route('/users')
def users():
    userinfo = db.session.query(User).all()
    user_list = []
    for user in userinfo:
        user_list.append(user.to_dict())

    response = make_response(jsonify(user_list),200)
    return response

@app.route('/cards')
def cards():
    cardinfo = db.session.query(Card).all()
    card_list = []
    for card in cardinfo:
        card_list.append(card.to_dict())
    response = make_response(
        jsonify(card_list),200)
    return response

@app.route('/Sets')
def sets():
    setinfo = db.session.query(ReleaseSet).all()
    set_list = []
    for pack in setinfo:
        set_list.append(pack.to_dict())
    response = make_response(
        jsonify(set_list),200
    )
    return response

@app.route('/Banlists')
def Banlists():
    banListInfo = db.session.query(Banlist).all()
    banList = []
    for banlist in banListInfo:
        banList.append(banlist.to_dict())
    response = make_response(
        jsonify(banList,200)
    )
    return response

@app.route('/Decks')
def Decks():
    decks = db.session.query(Deck).all()
    deckList = []
    for deck in decks:
        deckList.append(deck.to_dict())
    response = make_response(
        jsonify(deckList,200)
    )
    return response

@app.route('/cardindeck')
def cardindeck():
    decks = db.session.query(CardinDeck).all()
    deckList = []
    for deck in decks:
        deckList.append(deck.to_dict())
    response = make_response(
        jsonify(deckList,200)
    )
    return response

@app.route('/invent')
def invent():
    decks = db.session.query(Inventory).all()
    deckList = []
    for deck in decks:
        deckList.append(deck.to_dict())
    response = make_response(
        jsonify(deckList,200)
    )
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)