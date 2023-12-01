from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User


def chuong_va_dieu_seriali(chuong_va_dieu):
    return {
        'id': chuong_va_dieu.id,
        'chi_muc': chuong_va_dieu.chi_muc,
        'mapc': chuong_va_dieu.mapc,
        'ten': chuong_va_dieu.ten,
        'chu_de_id': chuong_va_dieu.chu_de_id,
        'de_muc_id': chuong_va_dieu.de_muc_id
    }





def api_chuong_va_dieu():
   list_chuong_va_dieu = dao.get_all_chuong_va_dieu()
   if list_chuong_va_dieu is not None:
       serialized_list_chuong_va_dieu = [chuong_va_dieu_seriali(chuong_va_dieu) for chuong_va_dieu in list_chuong_va_dieu]
       return jsonify(serialized_list_chuong_va_dieu)


