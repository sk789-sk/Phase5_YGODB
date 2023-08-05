from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'Users'
    #table columns
        #usesrname, password, email, profile picture, created at
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password = db.Column(db.String) #hash after
    email = db.Column(db.String) #encrypt?
    
    profile = db.Column(db.String) #path to profile
    created_at = db.Column(db.DateTime(timezone=True), default= db.func.now())
    
    #ForeignKeys

    #relationships
    
    card_in_inventory = db.relationship("Inventory" , backref = "user")

    user_decks = db.relationship("Deck",backref = "user")

    #validations
    

    #email validation,username length
    
    
    #Serializer Rules


    serialize_rules = ('-card_in_inventory.user','-user_decks.user','-card_in_inventory.card','-user_decks.card_in_deck')
    
    

    #repr

  

class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'Inventories'
    #table columns 
        #id, user id, card_id, quantity, created_at 
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), default= db.func.now())
    isFirstEd = db.Column(db.Boolean)

    #ForeignKeys
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('Cards.id'))
    
    #relationships
    #validations
    @validates('quantity')
    def validate_quantity(self,key,quantity):
        if quantity >0:
            return quantity
        return ValueError

    #Serializer Rules
    serialize_rules = ('-user.card_in_inventory','-card.card_in_inventory','-card.releaseSet','-card.card_in_deck','-user.user_decks')  
    
    #repr

class Card(db.Model, SerializerMixin):
    __tablename__ = 'Cards'
    #table columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    level = db.Column(db.Integer)
    card_type = db.Column(db.String) #normal monster, spell , trap, effect monster 
    card_race = db.Column(db.String) #this is card type spellcaster/gemini/winged beast for monsters. For spells it is quickplay, spell, etc, for traps cont counter etc
    card_attribute = db.Column(db.String) 
    LegalDate = db.Column(db.String) #first printing or when the card became legal
    card_image = db.Column(db.String) #Reference to location on disk
    rarity = db.Column(db.String) #Should there be a table list of rarities, will there be a use for that table not sure yet
    set_id = db.Column(db.String)
    ygopro_id = db.Column(db.Integer)
    #ForeignKeys

    releasedSet = db.Column(db.Integer, db.ForeignKey('ReleaseSets.id')) 
    
    #relationships
    
    card_in_inventory = db.relationship("Inventory" , backref = "card") 

    card_in_deck = db.relationship("CardinDeck",backref = "card") 
    
    card_on_banlist = db.relationship('BanlistCard',backref='card')
    
    #validations
    #Serializer Rules
    serialize_rules = ('-card_in_inventory.card','-card_in_deck.card','-card_in_inventory.user','-card_on_banlist.card','-releaseSet.cards_in_set')

    def __repr__(self):
        return f'detailed information can be found at endpoint {self.ygopro_id}'

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'Decks'
        #table columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), default= db.func.now())
    isPublic = db.Column(db.Boolean, default=False)

    #ForeignKeys
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))


    #relationships

    #need relationship between deck and cards in deck then

    card_in_deck = db.relationship('CardinDeck', backref = 'deck')

    #validations
    #Cards in a deck can not have more than 3 copies. 
    #Serializer Rules
    
    serialize_rules = ('-card_in_deck.deck','-user.user_decks','-user.card_in_inventory')

    #repr

class CardinDeck(db.Model, SerializerMixin):
    __tablename__ = 'CardsinDecks'
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    
    #foreignKeys
    deck_id = db.Column(db.Integer, db.ForeignKey('Decks.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('Cards.id'))

    #SeralizerRules

    serialize_rules = ('-deck.card_in_deck','-card.card_in_deck','-card.card_in_inventory','-card.releaseSet')

class ReleaseSet(db.Model, SerializerMixin):
    __tablename__ = 'ReleaseSets'
    #table columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    releaseDate = db.Column(db.String)
    card_count = db.Column(db.Integer)
    set_code = db.Column(db.Integer)

    #ForeignKeys

    #relationships
    cards_in_set = db.relationship('Card',backref='releaseSet')

    #validations
    #Serializer Rules

    serialize_rules = ('-cards_in_set.releaseSet',)

    #repr
    def __reper__(self):
        return f'f{self.name} was released on {self.releaseDate}'
    
#TODOLater if Time permits










#Extra DowntheLine
    
class Banlist(db.Model, SerializerMixin):
    __tablename__ = 'Banlists'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)

    #foreignKey

    #relationships

    card_on_banlist = db.relationship('BanlistCard',backref='banlist') 

    #seralizer rules
    serialize_rules = ('-card_on_list.banlist')
        

    def __repr__(self):
        return f'Banlist {self.name} from {self.start_date} to {self.end_date}'


class BanlistCard(db.Model, SerializerMixin):
    #join table between banlist and cards
    __tablename__ = 'BanlistCards'
    id = db.Column(db.Integer,primary_key = True)
    quantity = db.Column(db.Integer)

    #foreignKeys
    banlist_id = db.Column(db.Integer, db.ForeignKey('Banlists.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('Cards.id'))

    #seralizer rules
    serialize_rules = ('-banlist.card_on_banlist','-card.card_on_banlist')

    def __repr__(self):
        return f'Card with id {self.card_id} is limited to {self.quantity} copies in banlist {self.banlist_id}'
    



# #General Rule for serializer rules that works for me 
# 1. If you have the foreign key kill the backref.relationshipname
# 2. If you have the relationship kill the relationship.backref