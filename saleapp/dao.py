import hashlib

from saleapp import db
from saleapp.models import *



def add_user(name, username, password, **kwargs):
    user = User(name=name,
                username=username,
                password=str(hashlib.md5(password.strip().encode("utf-8")).hexdigest()), email=kwargs.get('email'), avatar = kwargs.get('avatar'))
    print(user)
    db.session.add(user)
    db.session.commit()
    return user

def add_user_api(name, username, password, **kwargs):
    user = User(name=name,
                username=username,
                password=str(hashlib.md5(password.strip().encode("utf-8")).hexdigest()))
    db.session.add(user)
    db.session.commit()

    return user

def check_login(username, password):
    password = str(hashlib.md5(password.strip().encode("utf-8")).hexdigest())
    return User.query.filter(User.username == username,
                             User.password == password).first()
def get_user_by_id(user_id):
    return User.query.filter(User.id.__eq__(user_id)).first()


def get_user_by_username(username):
    return User.query.filter(User.username.__eq__(username.strip())).first()


def get_chu_de_phap_dien():
    return ChuDePhapDien.query.all()

def get_de_muc_phap_dien():
    return DeMucPhapDien.query.all()

def get_all_chuong_va_dieu():
    return ChuongVaDieuPhapDien.query.all()

def get_all_thuat_ngu():
    return ThuatNgu.query.all()