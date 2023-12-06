from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User

#    noi_dung_van_ban = Column(Text)
#     noi_dung_bao_cao = Column(Text)
#     id_thuat_ngu = Column(Integer, ForeignKey(ThuatNgu.id))
#     id_user = Column(Integer, ForeignKey(User.id))
#     thoi_gian = Column(DateTime, nullable=False, default=datetime.now())
#     user = relationship('models.User', backref='BaoCaoNguoiDung', lazy=True)
#     thuat_ngu = relationship('models.ThuatNgu', backref='BaoCaoNguoiDung', lazy=True)


def api_ghi_nhan_bao_cao():
   noi_dung_van_ban = request.json.get('noi_dung_van_ban')
   noi_dung_bao_cao = request.json.get('noi_dung_bao_cao')
   thuat_ngu = request.json.get('thuat_ngu')
   id_user = request.json.get('id_user')
   check = dao.ghi_nhan_bao_cao(noi_dung_van_ban=noi_dung_van_ban, noi_dung_bao_cao= noi_dung_bao_cao, thuat_ngu=thuat_ngu, id_user=id_user)
   if check:
       return jsonify({"msg": "Ghi nhận báo cáo thành công"}), 200
   else:
       return jsonify({"msg": "Ghi nhận báo cáo thất bại"}), 400

