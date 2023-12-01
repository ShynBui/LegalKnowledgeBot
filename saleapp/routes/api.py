from flask import Blueprint
from flask_jwt_extended import JWTManager

from saleapp.controller.AUserController import *
from saleapp.controller.AChuDePhapDien import *
from saleapp.controller.AChuongVaDieu import *
from saleapp.controller.ADeMucPhapDien import *
from saleapp.controller.AThuatNgu import *



api = Blueprint('api', __name__)





api.route('/login', methods=['POST'])(api_user_login)
api.route('/current-user', methods=["GET"])(api_current_user)
api.route('/register-user', methods=["POST"])(api_user_register)


api.route('/chu_de_phap_dien', methods=["GET"])(api_chu_de_phap_dien)
api.route('/de_muc_phap_dien', methods=["GET"])(api_de_muc_phap_dien)
api.route('/chuong_va_dieu_phap_dien', methods=["GET"])(api_chuong_va_dieu)
api.route('/thuat_ngu', methods=["GET"])(api_thuat_ngu)
