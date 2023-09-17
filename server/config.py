# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os


# Local imports

# Instantiate app, set attributes

app = Flask(__name__)

test = 'hi'


# app.config['SECRET_KEY'] = 'abcd'
app.secret_key = 'fdasfafafa'

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE

'sqlite:///app.db'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

# Define metadata, instantiate db
metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
