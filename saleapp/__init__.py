import logging

from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from urllib.parse import quote
import cloudinary
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
import logging

if os.getenv('IS_DEPLOY'):
    print('[DEPLOY]')
else:
    load_dotenv()

HOST = os.getenv('HOST')

app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
cors = CORS(app, resources={r"/api/*": {"origins": os.getenv('CORS_URL')}})
app.secret_key = '689567gh$^^&*#%^&*^&%^*DFGH^&*&*^*'
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{os.getenv('DB_USER')}:{quote(os.getenv('DB_PASS'))}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
db = SQLAlchemy(app=app)
login = LoginManager(app=app)
jwt = JWTManager(app)

# log_format = '%(asctime)s - %(levelname)s - %(message)s'
# logging.basicConfig(level=logging.DEBUG, format=log_format)

# # Logging DB information
# logging.error(f"DB_USER: {os.getenv('DB_USER')}")
# logging.error(f"DB_PASS: {os.getenv('DB_PASS')}")
# logging.error(f"DB_HOST: {os.getenv('DB_HOST')}")
# logging.error(f"DB_NAME: {os.getenv('DB_NAME')}")

cloudinary.config(
    cloud_name="dcjashgrj",
    api_key="398533167669176",
    api_secret="2P32JSJ8P9PTnSaJ55WujgRiqWU"
)