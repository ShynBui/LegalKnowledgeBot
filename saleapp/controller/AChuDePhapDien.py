from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User


def chude_serializer(chude):
    return {
        'id': chude.id,
        'stt': chude.stt,
        'ten_chu_de': chude.ten_chu_de
    }





def api_chu_de_phap_dien():
   list_chude = dao.get_chu_de_phap_dien()
   if list_chude is not None:
       serialized_list_chu_de = [chude_serializer(chu_de) for chu_de in list_chude]
       return jsonify(serialized_list_chu_de)


