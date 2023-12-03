import hashlib

from numpy.distutils.fcompiler import none
from sqlalchemy import null

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
    usertemp = get_user_by_username(username)
    if usertemp:
        print("user da ton tai")
        return False
    else:
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
    return ChuDePhapDien.query.order_by(ChuDePhapDien.stt).all()


def get_de_muc_phap_dien(chu_de_id):
    return DeMucPhapDien.query.filter(DeMucPhapDien.chu_de_id.__eq__(chu_de_id)).order_by(DeMucPhapDien.stt).all()


def get_chuong_va_dieu_theo_de_muc(de_muc_id):
    return ChuongVaDieuPhapDien.query \
        .filter(ChuongVaDieuPhapDien.de_muc_id.__eq__(de_muc_id)) \
        .filter(ChuongVaDieuPhapDien.chuong_cha_id.__eq__(None)) \
        .order_by(ChuongVaDieuPhapDien.stt) \
        .all()


def get_chuong_va_dieu_theo_cha(cha_id):
    return ChuongVaDieuPhapDien.query \
        .filter(ChuongVaDieuPhapDien.chuong_cha_id.__eq__(cha_id)) \
        .order_by(ChuongVaDieuPhapDien.stt) \
        .all()


def get_all_thuat_ngu():
    return ThuatNgu.query.all()


def delete_user_by_username(username):
    try:
        user = get_user_by_username(username)
        print(user)
        if user is not None:
            db.session.delete(user)
            db.session.commit()
            print(f"User with ID {username} deleted successfully.")
            return True
        else:
            print(f"User with ID {username} not found.")
            return False

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False


def remove_escape_sequences(string):
    escape_sequences = ['\a', '\b', '\f', '\n', '\r', '\t', '\v', '\\', '\\\\', '\"', '\?', '\ooo', '\0']
    for i in escape_sequences:
        string = string.replace(i, ' ')
    return string


def is_in(x, data_thuat_ngu_2):
    if (x in data_thuat_ngu_2):
        return x
    return -1


def add_cau_hoi(tieu_de, noi_dung, chu_de_id, user_id):
    cauhoi = CauHoi(tieu_de_cau_hoi=tieu_de, noi_dung_cau_hoi=noi_dung, chu_de_id=chu_de_id, user_id=user_id)
    db.session.add(cauhoi)
    db.session.commit()
    return cauhoi


def get_cau_hoi_theo_chu_de(chu_de_id):
    return CauHoi.query.filter(CauHoi.chu_de_id.__eq__(chu_de_id)).order_by(CauHoi.thoi_gian).all()


def get_reply_of_cau_hoi(cau_hoi_id):
    return Reply.query.filter(Reply.cau_hoi_id.__eq__(cau_hoi_id)).order_by(Reply.thoi_gian).all()


def add_reply(noi_dung, cau_hoi_id, user_id):
    reply = Reply(noi_dung_tra_loi=noi_dung, cau_hoi_id=cau_hoi_id, user_id=user_id)
    db.session.add(reply)
    db.session.commit()
    return reply


def get_cau_hoi_by_id(id):
    return CauHoi.query.filter(CauHoi.id.__eq__(id)).first()
