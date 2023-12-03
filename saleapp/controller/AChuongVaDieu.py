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
        'de_muc_id': chuong_va_dieu.de_muc_id
    }





def api_chuong_va_dieu_theo_de_muc(de_muc_id):
   list_chuong_va_dieu = dao.get_chuong_va_dieu_theo_de_muc(de_muc_id)
   if list_chuong_va_dieu is not None:
       serialized_list_chuong_va_dieu = [chuong_va_dieu_seriali(chuong_va_dieu) for chuong_va_dieu in list_chuong_va_dieu]
       return jsonify(serialized_list_chuong_va_dieu)



def api_chuong_va_dieu_theo_chuong(chuong_id):
   list_chuong_va_dieu = dao.get_chuong_va_dieu_theo_cha(chuong_id)
   if list_chuong_va_dieu is not None:
       serialized_list_chuong_va_dieu = [chuong_va_dieu_seriali(chuong_va_dieu) for chuong_va_dieu in list_chuong_va_dieu]
       return jsonify(serialized_list_chuong_va_dieu)

