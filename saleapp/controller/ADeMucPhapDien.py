from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User


def demuc_serializer(demuc):
    return {
        'id': demuc.id,
        'stt': demuc.stt,
        'ten_chu_de': demuc.ten_de_muc,
        'chu_de_id': demuc.chu_de_id
    }





def api_de_muc_phap_dien():
   list_demuc = dao.get_de_muc_phap_dien()
   if list_demuc is not None:
       serialized_list_de_muc = [demuc_serializer(demuc) for demuc in list_demuc]
       return jsonify(serialized_list_de_muc)


