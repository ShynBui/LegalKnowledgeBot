from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token

from saleapp import app

from flask import jsonify, request

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


@app.route('/api/login', methods = ["POST"])
def a_user_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "123":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
