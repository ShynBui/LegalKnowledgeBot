from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User


def user_serializer(user):
    return {
        'mssv': user.mssv,
        'email': user.email,
        'gpa': user.gpa,
        'diemHeMuoi': user.diemHeMuoi,
        'avatar': user.avatar,
        'diachi': user.diachi,
        'username': user.username,
        'password': user.password,
        'name': user.name,
        'lop': user.lop,
        'nien_khoa': user.nien_khoa,
        'diem_ren_luyen': user.diem_ren_luyen,
        'nganh': user.nganh,
        'is_active': user.is_active,
        'joined_at': user.joined_at.strftime('%Y-%m-%d %H:%M:%S'),  # Chuyển đổi thành chuỗi ngày giờ
        'role': user.role.value
    }



@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    print(identity)
    return dao.get_user_by_id(identity)

def api_user_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print(username)
    print(password)
    user = dao.check_login(username, password)
    print(user)
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@jwt_required()
@cross_origin()
def api_current_user():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        name=current_user.name,
        username=current_user.username,
    )


def api_user_register():
    username = request.json.get("username", None)
    email = request.json.get("email", None)

    name = request.json.get('name', None)
    password = request.json.get("password", None)
    confirmPass = request.json.get("confirmPassword", None)
    user = dao.add_user_api(name = name, username = username, password = password, email = email)
    print(user)
    if(user):
        return jsonify({"msg": "register sucess"}), 201
    else:
        return jsonify({"msg": "register faleied"}), 300

