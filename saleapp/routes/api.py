from flask import Blueprint
from saleapp.controller.AUserController import *


api = Blueprint('api', __name__)

api.route('/login', methods=['POST'])(a_user_login)

