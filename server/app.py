#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import *
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
import os

# Local imports
from config import app, db, api
from models import User, Card, Deck, CardinSet, Banlist, BanlistCard

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

#Convert for loops into list comprehensions 





@app.route('/')
def home():
    return 'testing base'


#User

@app.route('/Register', methods=['POST'])
def register():
    data = request.get_json()

    try:
        new_user = User(
            username = data['username'],
            password = data['password']
        )

        db.session.add(new_user)
        db.session.commit() 

        response = make_response(new_user.to_dict(),200)
   
    except ValueError:
        response = make_response(
            { "errors": ["validation errors,attribute errors"] }, 400)

    return response

@app.route('/users')
def users():
    userinfo = db.session.query(User).all()
    user_list = []
    for user in userinfo:
        user_list.append(user.to_dict())

    response = make_response(jsonify(user_list),200)
    return response

@app.route('/users/<int:id>', methods=['GET','PATCH','DELETE'])
def user_id(id):

    user = User.query.filter(User.id==id).first()

    if user:

        if request.method == 'GET':

            response = make_response(user.to_dict(),200)
        
        elif request.method == 'PATCH':
            data = request.get_json()

            try:
                for key in data:
                    setattr(user,key,data[key])

                    db.session.add(user)
                    db.session.commit
                
                response = make_response(user.to_dict(),200)
            except ValueError: 
                    response = make_response(
                    { "errors": ["validation errors,attribute errors"] },
                    400
                    )

        elif request.method == 'DELETE':
            #Want to delete user so delete all decks and inventory that they own as well.
            user_decks = Deck.query.filter(Deck.user_id==id).all()
            user_invent = Inventory.query.filter(Inventory.user_id==id).all()
            
            #For each deck that we delete need to delete all cards in the deck
            #TODO

            print(user_decks)
            print(user_invent)

            if user_decks:
                for deck in user_decks:
                    db.session.delete(deck)
            if user_invent:
                for card in user_invent:
                    db.session.delete(card)

            db.session.delete(user)
            db.session.commit()

            response = make_response({}, 204)

    else:
        response = make_response(
            { "error": "User not found" },
            404
            )
        

    return response




@app.route('/LogIn')
def logIn():
    return 'login'


#Card Routes
# 1) view All cards/card search bar Need all card info at once here 
# 2) View a specific card. This will have detailed information such as description all sets and rarities it has been released in.

def paginate(query,page, per_page):
    return query.paginate(page=page,per_page=per_page) #these all have to be deinfed with keyword only?


@app.route('/cards') #Load all card info. Ideally we only need the info of 1 card and not reprints/etc so just the first instance of the name. Only 1 name instead of loading 5682 copies of DMG
def cards():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page',default=20,type=int)

    #basic filter terms
    card_name = request.args.get('search', type=str)
    card_type = request.args.get('type', type=str)
    
    if card_type and card_name:
        cardinfo = Card.query.filter(Card.card_type.ilike(card_type),Card.name.contains(card_name))
        paginated_cards = paginate(cardinfo,page,per_page)
    elif card_name:
        print(card_name)
        cardinfo = Card.query.filter(Card.name.contains(card_name))
        paginated_cards = paginate(cardinfo,page,per_page)
    elif card_type:
        #if we get either value we have a filter 
        cardinfo = Card.query.filter(Card.card_type.ilike(card_type))
        paginated_cards = paginate(cardinfo,page,per_page)
    else:
        cardinfo = db.session.query(Card)
        paginated_cards = paginate(cardinfo,page,per_page) 



    #cards = paginated_cards.items   #this is an instance of each card basically 1 row in table or 1 object

    card_list = []

    for card in paginated_cards.items:
        card_list.append(card.to_dict(rules=('-card_in_deck','-card_in_inventory','-card_on_banlist','-releaseSet')))

    response_data = {
        'cards' : card_list,
        'page' : page,
        'per_page': per_page,
        'total_pages':paginated_cards.pages,
        'total_items':paginated_cards.total
    }

    response = make_response(
        jsonify(response_data),200)
    
    return response


@app.route('/cards/<int:id>')
def cards_by_id(id):
    card = Card.query.filter(Card.id == id).first()
    response = make_response(card.to_dict(),200)
    return response


@app.route('/cards/<string:name>')
def cards_by_name(name):
    all_cards = Card.query.filter(Card.name == name).all()
    card_list = []
    for card in all_cards:
        card_list.append(card.to_dict())
    response = make_response(
        jsonify(card_list),200)
    return response

@app.route('/cards/id2db')
def card_code_to_db_id():
    cardinfo = db.session.query(Card).all() 
    card_list = []
    for card in cardinfo:
        card_list.append(card.to_dict(only=('id','set_id')))
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
        set_list.append(pack.to_dict())   #only=('name','id','card_count','releaseDate','set_code'
    response = make_response(
        jsonify(set_list),200
    )
    return response

@app.route('/Sets/<int:id>')
def sets_by_id(id):
    #For this we need to get the set information and all the card information
    cards = CardinSet.query.filter(CardinSet.set_id==id).all() 
    outlist = []
    for card in cards:
        outlist.append(card.to_dict())
    response = make_response(jsonify(outlist),200)

    return response

@app.route('/Sets/<string:name>') 
def sets_by_name(name):
    #need to get the card info for a set
    
    card_list = ReleaseSet.query.filter(ReleaseSet.name == name).first()

    response = make_response(jsonify(card_list.to_dict()),200)
    # only=('cards_in_set[only select terms]','name','card_count','releaseDate','setCode)
    return response

@app.route('/CardinSet')
def card_in_sets():
    cards = db.session.query(CardinSet).all()

    card_list = []
    for card in cards:
        card_list.append(card.to_dict())
    response = make_response(
        jsonify(card_list),200
    )

    return response




#Decks.
#Global Deck, User all decks, user 1 deck

@app.route('/Decks')
def Decks():

    decks = db.session.query(Deck).all()
    deckList = []
    for deck in decks:
        deckList.append(deck.to_dict())
    response = make_response(
        jsonify(deckList),200
    )
    return response

@app.route('/Deck/<int:id>', methods = (['GET','PATCH']))
def singleDeck(id): 
    #A single deck by id 

    deck = Deck.query.filter(Deck.id == id).first()

    if deck: 
        if request.method == 'GET':

            response = make_response(
                deck.to_dict(),200)
            
        elif request.method == 'PATCH':
            data = request.get_json()
            print(data)

            try:
                for key in data:
                    setattr(deck,key,data[key])
                    db.session.add(deck)
                    db.session.commit()  

                response = make_response(deck.to_dict(),202)
                print('setattr succ')
            except ValueError:
                 print('setattr failed')
                 response = make_response(
                    { "errors": ["validation errors"] },
                    400
                    )
    else:
        response = make_response(
            {},404
        )
    return response

@app.route('/Decks/<int:id>', methods = (['GET','POST']))
def all_user_deck(id): #'all decks a user has'. 'Can create a deck id and then go to that deck'


    decks_all = Deck.query.filter(Deck.user_id == id).all()
    
    if request.method == 'POST': 
            
            data = request.get_json()

            try:
                new_deck = Deck(
                    name = data['name'],
                    isPublic = data['isPublic'],
                    user_id = data['user_id']
                )

                db.session.add(new_deck)
                db.session.commit()
                response = make_response(new_deck.to_dict(),200)
            
            except ValueError:
                response = make_response({"errors":"validation error"},400)

    if decks_all:

        if request.method == 'GET':   
            output = []
            for deck in decks_all:
                output.append(deck.to_dict())
            response = make_response(
                jsonify(output),200
            )

    else:

        init_deck_invent = []
        init_deck = Deck.query.filter(Deck.user_id == 1).first()

        init_deck_invent.append(init_deck.to_dict())

        response = make_response(jsonify(init_deck_invent),200)

        # response = make_response(
        #     {"error":"User has no decks"},404
        # )

    return response


@app.route('/Decks/<int:id>/<string:deck_name>', methods = ['GET','PATCH','POST','DELETE'] )

def one_user_deck_id(id,deck_name): #Singular Deck for an owner by name is this needed i am doubting?
    deck = Deck.query.filter((Deck.user_id==id),(Deck.id==deck_name)).first()

    if deck:

        if request.method == 'GET':
            response = make_response(deck.to_dict(),200)
        
        if request.method == 'POST':
            response = 'post'
        
        if request.method == 'PATCH':
            response = 'patch'
        if request.method == 'DELETE':
            response = 'delete'
    else:
        response = 'nodeck'
    return response

@app.route('/Decks/<int:id>/<int:deckid>', methods = ['GET','PATCH','POST','DELETE'])
def one_user_deck_name(id,deckid): #Singular Deck for an owner

    deck = Deck.query.filter((Deck.user_id==id),(Deck.id==deckid)).first()

    if deck:

        if request.method == 'GET':
            response = make_response(deck.to_dict(),200)
        
        elif request.method == 'POST':
            data = request.get_json()

            try:
                new_deck = Deck(
                    name = data['name'],
                    isPublic = data['isPublic'],
                    user_id = data['user_id']
                )

                db.session.add(new_deck)
                db.session.commit()
                response = make_response(new_deck.to_dict(),200)
            
            except ValueError:
                response = make_response({"errors":"validation error"},400)
        
        elif request.method == 'PATCH':
            data = request.get_json()

            try:
                for key in data:
                    setattr(deck,key,data[key])

                    db.session.add(deck)
                    db.session.commit
                
                response = make_response(deck.to_dict(),200)
            except ValueError: #i dont think attribute error is possible from the user side.
                    response = make_response(
                    { "errors": ["validation errors"] },
                    400
                    )

        elif request.method == 'DELETE':

            #Delete the cards associated with the deck
            cards = CardinDeck.query.filter(CardinDeck.deck_id==deckid).all()
            
            for card in cards:
                db.session.delete(card)

            db.session.delete(deck)
            db.session.commit()

            response = make_response({},204)
    else:
        response = make_response({'error':'deck doesnt exist'},404)
    return response
@app.route('/cardindeck', methods = ['POST'])
def cardindeckpost():

    if request.method == 'POST':
            
        data = request.get_json()
            
        try:
            new_card_in_deck = CardinDeck(
                deck_id = data['deck_id'],
                card_id = data['card_id'],
                quantity = data['quantity']
            )

            db.session.add(new_card_in_deck)
            db.session.commit()
            response = make_response(new_card_in_deck.to_dict(),200)
            
        except ValueError:
           response = make_response(
           { "errors": ["validation errors"] },
            400
        )
    else:
        response = make_response({},404)
    return response

@app.route('/cardindeck/<int:id>',methods = ['GET','PATCH','POST','DELETE'])
#Adjust the cards in a deck. User should only be able to edit cards in their own deck need to add auth for that. a few things need auth so need to look into that now. Visually If i remove something from the deck I would want to see that reflected right away Only when saving do we commit all the changes to the DB. What is changing on the DB is deck_id and associated card_id
def cardindeck(id):

    card = CardinDeck.query.filter(CardinDeck.id==id).first()
    print(card)

    if card: 
        if request.method == 'GET':
            response = make_response(card.to_dict(),200)

        elif request.method == 'PATCH':
            data = request.get_json()
            print(data)

            try:
                for key in data:
                    setattr(card,key,data[key])
                    db.session.add(card)
                    db.session.commit()  

                response = make_response(card.to_dict(),202)
                print('setattr succ')
            except ValueError:
                 print('setattr failed')
                 response = make_response(
                    { "errors": ["validation errors"] },
                    400
                    )

        elif request.method == 'DELETE': #I dont know if this is what I would really want.
            db.session.delete(card)
            db.session.commit()
            response = make_response ( {},204)
            
    else:
        response = make_response({},404)
    return response

#Inventory.
#Card Invent dunno, User entire inventory, user specific card details.

@app.route('/inventory')
def invent():
    invent_all = db.session.query(Inventory).all()
    inventList = []
    for invent in invent_all:
        inventList.append(invent.to_dict())
    response = make_response(
        jsonify(inventList,200)
    )
    return response
   

@app.route('/inventory/<int:id>', methods = ['GET', 'POST','DELETE'])
def invent_by_id(id):

    inventory = Inventory.query.filter(Inventory.user_id == id).all()

    if inventory: #if this user has an inventory
    
        if request.method == 'GET':
            cards_in_invent = []
            for card in inventory:
                cards_in_invent.append(card.to_dict())

            response = make_response(jsonify(cards_in_invent),200)

        if request.method == 'POST':
            data = request.get_json()
            try:
                #If getting card from out end we should be able to get back the id instead of the name
                new_card_invent = Inventory(
                    quantity = data['quantity'],
                    isFirstEd = data['isFirstEd'],
                    user_id = data['user_id'],
                    card_id = data['card_id']
                )
                db.session.add(new_card_invent)
                db.session.commit()

                response = make_response(new_card_invent.to_dict(),200)
            except ValueError:
                response = make_response( { "errors": "validation errors" },400)
        
        if request.method == 'DELETE':
            #user deletes the entire inventory
            cards_in_invent = Inventory.query.filter(Inventory.user_id == id).all()

            for card in cards_in_invent:
                db.session.delete(card)
            
            db.session.commit()

            response = make_response({}, 204)
    else:
        #user does not have an inventory so this loads a placeholder.
        #an initializes an inventory

        if request.method == 'POST':
            data = request.get_json()
            try:
                #If getting card from out end we should be able to get back the id instead of the name
                new_card_invent = Inventory(
                    quantity = data['quantity'],
                    isFirstEd = data['isFirstEd'],
                    user_id = data['user_id'],
                    card_id = data['card_id']
                )
                db.session.add(new_card_invent)
                db.session.commit()

                response = make_response(new_card_invent.to_dict(),200)
            except ValueError:
                response = make_response( { "errors": "validation errors" },400)

        else:
            init_invent = []
            init_card = Inventory.query.filter(Inventory.user_id == 1).first()

            init_invent.append(init_card.to_dict())

            response = make_response(jsonify(init_invent),200)

        # response = make_response(
        #     {"error":"User has no Cards"},404

        #make the response 
    
    return response

@app.route('/inventory/<int:id>/<int:card_id>', methods = ['GET', 'PATCH','DELETE']) #a users card in inventory. We can add delete/ adjust quantity etc here, get detailed info and picture that are uploaded. Since i am more likely to own duplicates of a card i think it makes more sense to go by card name instead of card id. card_id means i cant filter by 

#Maybe query all and then filter inventory cards by name? 
def user_invent_card(id,card_id):

    card=Inventory.query.filter(Inventory.user_id==id,Inventory.card_id==card_id).first()

    #What I actually want to do is use the id to filter by cards that a user owns. Then check the card_table for ones that match in name

    # cards = db.session.query(Inventory.user_id,Card.name).filter(Inventory.user_id==id).filter(Card.name==name) #something along those lines

    #join is the way to go? db.session.query(Inventory).join(Inventory.card_id)


    if card:

        if request.method == 'GET':
            response = make_response(card.to_dict(),200)

        elif request.method == 'PATCH':
            data = request.get_json()

            try:
                for key in data:
                    setattr(card,key,data[key])

                    db.session.add(card)
                    db.session.commit()
                
                response = make_response(card.to_dict(),200)
            except ValueError: 
                    response = make_response(
                    { "errors": ["validation errors"] },
                    400
                    )


        if request.method == 'DELETE':
            #User deletes 1 card from inventory
            db.session.delete(card)
            db.session.commit()
            response = make_response({}, 204)
    
    else:
        response = make_response( {
            'Error':'Does not exist'},404
        )

    return response

@app.route('/Login', methods = ['POST'])
def Login():

    #Get username and pass form client, 
    #Check if the data matches
    #If so we set the session user id to the user and then return a sucess or failure
    
    user_info = request.get_json() 
    
    user = User.query.filter(User.username == user_info['username']).first()
    
    if user:

        pass_match = (user_info['password'] == user.password)
        
        if pass_match: 
            #if password matches

            # session['user_id'] = user.id
            #No secret_key. I can still return a user and then use that to create a state of the user and pass that. I guess I can make the delete just change the user. The delete orute does nothing then

            response = make_response( 
                jsonify(user.to_dict()), 201
            )
        else:
           response = make_response({},401)
    else:
        response = make_response({},404)
    
    return response

@app.route('/Logout', methods = ['DELETE'])
def Logout():
    return make_response( {},200)


























#Extra

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
