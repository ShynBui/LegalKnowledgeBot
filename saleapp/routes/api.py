from flask import Blueprint
from saleapp.controller.AUserController import *


api = Blueprint('api', __name__)

api.route('/login', methods=['POST'])(api_user_login)
api.route('/current-user', methods=["GET"])(api_current_user)
api.route('/register-user', methods=["POST"])(api_user_register)
