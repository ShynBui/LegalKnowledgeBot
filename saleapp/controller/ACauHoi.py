from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user
from datetime import datetime
from saleapp import app, jwt, dao

from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from saleapp.models import User


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    print(identity)
    return dao.get_user_by_id(identity)

def cauhoi_serializer(cauhoi):
    formatted_time = cauhoi.thoi_gian.strftime('%d-%m-%Y')
    print(cauhoi.id)
    return {
        'id': cauhoi.id,
        'tieu_de': cauhoi.tieu_de_cau_hoi,
        'noi_dung': cauhoi.noi_dung_cau_hoi,
        'ten_chu_de': cauhoi.chu_de_phap_dien.ten_chu_de,
        'author': cauhoi.user.name,
        'thoi_gian': formatted_time
    }





def api_get_cau_hoi_theo_chu_de(chu_de_id):

    list_cau_hoi = dao.get_cau_hoi_theo_chu_de(chu_de_id)
    if list_cau_hoi is not None:
        serialized_list_cau_hoi = [cauhoi_serializer(cau_hoi) for cau_hoi in list_cau_hoi]
        return jsonify(serialized_list_cau_hoi)


def api_add_cau_hoi():

    tieu_de = request.json.get("tieu_de", None)
    noi_dung_cau_hoi = request.json.get("noi_dung", None)
    user_id = request.json.get("user_id", None)
    chu_de_id = request.json.get("chu_de_id", None)

    cau_hoi = dao.add_cau_hoi(tieu_de = tieu_de, noi_dung= noi_dung_cau_hoi, chu_de_id=chu_de_id, user_id = user_id)
    print(cau_hoi)
    return jsonify({"msg": "Them cau hoi thanh cong"}), 200

def api_get_cau_hoi_by_id(id):

    cau_hoi = dao.get_cau_hoi_by_id(id)
    print(cau_hoi)
    return jsonify(cauhoi_serializer(cau_hoi))

@jwt_required()
@cross_origin()
def api_delete_tra_loi_by_id(id):
    print("da vao ")
    print(current_user.role.value)
    if current_user.role.value != 1:
        return jsonify({"msg": "ban ko co quyen xoa"})
    else:
        check = dao.delete_cau_tra_loi_by_id(id)
        if check:
            return jsonify({"msg": "xoa thanh cong"}), 200
        else:
            return jsonify({"msg": "Xoa that bai"}), 401
    # return jsonify(
    #     id=current_user.id,
    #     name=current_user.name,
    #     username=current_user.username,
    #     role = current_user.role.value
        
    # )