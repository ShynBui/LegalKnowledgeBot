from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user
from datetime import datetime
from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User


def traloi_serializer(traloi):
    formatted_time = traloi.thoi_gian.strftime('%d-%m-%Y')
    return {
        'id': traloi.id,
        'cau_hoi_id': traloi.cau_hoi_id,
        'thoi_gian': formatted_time,
        'reply': traloi.noi_dung_tra_loi,
        'author_reply': traloi.user.name
    }





def api_get_tra_loi_theo_cau_hoi(cau_hoi_id):
   list_tra_loi = dao.get_reply_of_cau_hoi(cau_hoi_id)
   if list_tra_loi is not None:
       serialized_list_tra_loi = [traloi_serializer(tra_loi) for tra_loi in list_tra_loi]
       return jsonify(serialized_list_tra_loi)


def api_add_cau_tra_loi():
    noi_dung_tra_loi = request.json.get("noi_dung", None)
    cau_hoi_id = request.json.get("question_id", None)
    user_id = request.json.get("user_id", None)

    reply = dao.add_reply(noi_dung= noi_dung_tra_loi, cau_hoi_id=cau_hoi_id, user_id = user_id)

    return jsonify({"msg": "Them cau hoi thanh cong"}), 200

