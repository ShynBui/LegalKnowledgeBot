from hmac import compare_digest

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum, Date
from sqlalchemy.orm import relationship,backref
from saleapp import db, app
from enum import Enum as UserEnum
from datetime import datetime
from flask_login import UserMixin


class BaseModel(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)


class UserRole(UserEnum):
    ADMIN = 1
    USER = 2

class User(BaseModel, UserMixin):
    __tablename__ = 'user'

    name = Column(String(100))
    username = Column(String(50), unique=True)
    password = Column(String(100), )
    email = Column(String(100), unique=True)
    avatar = Column(Text, default='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg')
    diachi = Column(String(100))
    phone = Column(String(15))
    is_active = Column(Boolean, default=True)
    joined_at = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(Enum(UserRole), default=UserRole.USER)

class ChuDePhapDien(db.Model):
    __tablename__ = 'chu_de_phap_dien'

    id = Column(Integer, primary_key=True)
    stt = Column(Integer)
    ten_chu_de = Column(String(100))

class DeMucPhapDien(db.Model):
    __tablename__ = 'de_muc_phap_dien'

    id = Column(Integer, primary_key=True)
    stt = Column(Integer)
    ten_de_muc = Column(String(100))
    chu_de_id = Column(Integer, ForeignKey(ChuDePhapDien.id))
    chu_de_phap_dien = relationship('ChuDePhapDien', backref = 'de_muc_phap_dien')

class ChuongVaDieuPhapDien(db.Model):
    __tablename__ = 'chuong_va_dieu_phap_dien'

    id = Column(Integer, primary_key=True)
    chi_muc = Column(Integer)
    mapc = Column(Integer)
    ten = Column(String(255))
    chu_de_id = Column(Integer, ForeignKey(ChuDePhapDien.id))
    de_muc_id = Column(Integer, ForeignKey(DeMucPhapDien.id))
    chu_de_phap_dien = relationship('ChuDePhapDien', backref = 'chuong_va_dieu_phap_dien')
    de_muc_phap_dien = relationship('DeMucPhapDien', backref = 'chuong_va_dieu_phap_dien')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()