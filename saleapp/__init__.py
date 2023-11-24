from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.secret_key = '689567gh$^^&*#%^&*^&%^*DFGH^&*&*^*'
app.config["JWT_SECRET_KEY"] = "@243124fas^&**&^$%"
login = LoginManager(app=app)
jwt = JWTManager(app)

