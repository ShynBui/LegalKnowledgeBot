from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from urllib.parse import quote
import cloudinary
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = '689567gh$^^&*#%^&*^&%^*DFGH^&*&*^*'
app.config["JWT_SECRET_KEY"] = "@^&**&^$%"
app.config["SQLALCHEMY_DATABASE_URI"] ="mysql+pymysql://root:%s@localhost/manguonmo2023?charset=utf8mb4" % quote('123456')

db = SQLAlchemy(app=app)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
login = LoginManager(app=app)
jwt = JWTManager(app)

cloudinary.config(
    cloud_name = "dcjashgrj",
    api_key = "398533167669176",
    api_secret = "2P32JSJ8P9PTnSaJ55WujgRiqWU"
)
