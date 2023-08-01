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

#Home Page

@app.route('/')
def home():
    return 'testing base'


#User


@app.route('/users')
def users():
    userinfo = db.session.query(User).all()
    user_list = []
    for user in userinfo:
        user_list.append(user.to_dict())

    response = make_response(jsonify(user_list),200)
    return response

@app.route('/LogIn')
def logIn():
    return 'login'


#Card Routes
# 1) view All cards/card search bar Need all card info at once here 
# 2) View a specific card. This will have detailed information such as description all sets and rarities it has been released in.


@app.route('/cards') #Load all card info. Ideally we only need the info of 1 card and not reprints/etc so just the first instance of the name. Only 1 name instead of loading 5682 copies of DMG
def cards():
    cardinfo = db.session.query(Card).all()
    card_list = []
    for card in cardinfo:
        card_list.append(card.to_dict())
    response = make_response(
        jsonify(card_list),200)
    return response

@app.route('/cards/<int:id>')
def cards_by_id(id):
    return 'card by id'

@app.route('/cards/<string:name>')
def cards_by_name(name):
    all_cards = Card.query.filter(Card.name == name).all()
    card_list = []
    for card in all_cards:
        card_list.append(card.to_dict())
    response = make_response(
        jsonify(card_list),200)
    return response

#Set Routes
#1. View All Sets 
#2. get detailed set info card pool and rarity/etc. 

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

@app.route('/Sets/<int:id>')
def sets_by_id(id):
    #need to get the card info for a set
    card_list = Card.query.filter(Card.releasedSet == id).all()
    output_cards = []
    for card in card_list:
        output_cards.append(card.to_dict(only=('name','set_id','rarity','releaseSet.name','releaseSet.releaseDate')))
    response = make_response(
        jsonify(output_cards),200
    )
    return response

@app.route('/Sets/<string:name>') 
def sets_by_name(name):
    #need to get the card info for a set
    card_list = db.session.query.filter(Card.set_id)

#Decks.
#Global Deck, User all decks, user 1 deck

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

@app.route('/Deck/<int:id>', methods = (['GET','DELETE','POST']))
def all_user_deck(id):
    return 'all decks a user has'

@app.route('/Deck/<int:id>/<int:deckid>', methods = ['GET','PATCH','POST','DELETE'] )
def one_user_deck(id,deckid):
    return '1 deck a user has'

#Inventory.
#Card Invent dunno, User entire inventory, user specific card details.

@app.route('/invent')
def invent():
    invent_all = db.session.query(Inventory).all()
    inventList = []
    for invent in invent_all:
        inventList.append(invent.to_dict())
    response = make_response(
        jsonify(inventList,200)
    )
    return response

@app.route('/invent/<int:id>', methods = ['GET', 'POST','DELETE'])
def invent_by_id(id):

    inventory = Inventory.query.filter(Inventory.id == id).all()

    if inventory: #if this user has an inventory
        if request.method == 'GET':
            response = make_response()

@app.route('/invent/<int:id>/<int:card_id>', methods = ['GET', 'PATCH','POST','DELETE']) #a users card in inventory
def user_invent_card(id,card_id):
    return 'details for a usercard'


#Extra

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)