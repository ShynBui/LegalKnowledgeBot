from flask import Blueprint
from flask_jwt_extended import JWTManager

from saleapp.controller.AUserController import *
from saleapp.controller.AChuDePhapDien import *
from saleapp.controller.AChuongVaDieu import *
from saleapp.controller.ADeMucPhapDien import *
from saleapp.controller.AThuatNgu import *
from saleapp.controller.ACauHoi import *
from saleapp.controller.ATraLoi import *
from saleapp.controller.ATimKiemThuatNgu import *
from saleapp.controller.ASearchGG import *




api = Blueprint('api', __name__)





api.route('/login/', methods=['POST'])(api_user_login)
api.route('/current-user/', methods=["GET"])(api_current_user)
api.route('/register-user/', methods=["POST"])(api_user_register)


api.route('/chu_de_phap_dien/', methods=["GET"])(api_chu_de_phap_dien)
api.route('/chu_de_phap_dien/<chu_de_id>/de_muc/', methods=["GET"])(api_de_muc_phap_dien)
api.route('/de_muc_phap_dien/<de_muc_id>/chi_muc/', methods=["GET"])(api_chuong_va_dieu_theo_de_muc)
api.route('/chuong_va_dieu_phap_dien/<chuong_id>/chi_muc/', methods=["GET"])(api_chuong_va_dieu_theo_chuong)
api.route('/thuat_ngu/', methods=["GET"])(api_thuat_ngu)
api.route('/thuat_ngu/doan_van/', methods=["POST"])(api_tim_thuat_ngu)
api.route('/thuat_ngu/<id>/', methods=["POST"])(get_thuat_ngu_in_html)
api.route('/terminologies/search-paragraph/', methods=['POST'])(search_terminology_form_paragraph)
api.route('/terminologies/', methods=['GET'])(get_terminology)

# cau hoi
api.route('/cau_hoi/<chu_de_id>/', methods=["GET"])(api_get_cau_hoi_theo_chu_de)
api.route('/add_cau_hoi/', methods=["POST"])(api_add_cau_hoi)
api.route('/cau_hoi_by_id/<id>', methods=["GET"])(api_get_cau_hoi_by_id)


# cau tra loi
api.route('/tra_loi/<cau_hoi_id>', methods=["GET"])(api_get_tra_loi_theo_cau_hoi)
api.route('/add_tra_loi/', methods=["POST"])(api_add_cau_tra_loi)

# search gg
api.route('/search_gg/', methods=["GET"])(api_search_gg)