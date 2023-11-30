from hmac import compare_digest
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum, Date
from sqlalchemy.orm import relationship
from saleapp import db, app
from enum import Enum as UserEnum
from datetime import datetime
from flask_login import UserMixin
from saleapp import importfile

class BaseModel(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)

class UserRole(UserEnum):
    ADMIN = 1
    USER = 2




class User(BaseModel, UserMixin):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    name = Column(String(100))
    username = Column(String(50), unique=True)
    password = Column(String(100))
    email = Column(String(100), unique=True)
    avatar = Column(Text, default='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg')
    diachi = Column(String(100))
    phone = Column(String(15))
    is_active = Column(Boolean, default=True)
    joined_at = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(Enum(UserRole), default=UserRole.USER)

    def __str__(self):
        return self.name

class ChuDePhapDien(db.Model):
    __tablename__ = 'chu_de_phap_dien'
    __table_args__ = {'extend_existing': True}

    id = Column(String(255), primary_key=True)
    stt = Column(Integer)
    ten_chu_de = Column(String(100))

    def __str__(self):
        return self.ten_chu_de

class DeMucPhapDien(db.Model):
    __tablename__ = 'de_muc_phap_dien'
    __table_args__ = {'extend_existing': True}

    id = Column(String(255), primary_key=True)
    stt = Column(Integer)
    ten_de_muc = Column(String(100))
    chu_de_id = Column(String(255), ForeignKey('chu_de_phap_dien.id'))
    chu_de_phap_dien = relationship('models.ChuDePhapDien', backref='de_muc_phap_dien', lazy=True)

    def __str__(self):
        return str(self.stt)

class ChuongVaDieuPhapDien(db.Model):
    __tablename__ = 'chuong_va_dieu_phap_dien'
    __table_args__ = {'extend_existing': True}

    id = Column(String(255), primary_key=True)
    chi_muc = Column(Integer)
    mapc = Column(String(255))
    ten = Column(String(255))
    chu_de_id = Column(String(255), ForeignKey('chu_de_phap_dien.id'))
    de_muc_id = Column(String(255), ForeignKey('de_muc_phap_dien.id'))
    chu_de_phap_dien = relationship('models.ChuDePhapDien', backref='chuong_va_dieu_phap_dien', lazy=True)
    de_muc_phap_dien = relationship('models.DeMucPhapDien', backref='chuong_va_dieu_phap_dien', lazy=True)

    def __str__(self):
        return str(self.chi_muc)

class ThuatNgu(BaseModel):
    __tablename__ = 'thuat_ngu'
    __table_args__ = {'extend_existing': True}

    thuat_ngu = Column(Text)
    mo_ta = Column(Text)
    nguon = Column(Text)
    link = Column(Text)
    label = Column(Integer)
    tinh = Column(String(255))


    def __str__(self):
        return str(self.thuat_ngu)




if __name__ == '__main__':
    with app.app_context():
        # db.drop_all()
        # db.session.commit()
        db.create_all()
        db.session.commit()

