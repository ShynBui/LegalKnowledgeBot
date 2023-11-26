import hashlib

from saleapp.models import *



def add_user(name, username, password, **kwargs):
    user = User(name=name,
                username=username,
                password=str(hashlib.md5(password.strip().encode("utf-8")).hexdigest()), email=kwargs.get('email'), avatar = kwargs.get('avatar'))
    print(user)
    db.session.add(user)
    db.session.commit()
    return user

def check_login(username, password):
    password = str(hashlib.md5(password.strip().encode("utf-8")).hexdigest())
    return User.query.filter(User.username == username,
                             User.password == password).first()
def get_user_by_id(user_id):
    return User.query.get(user_id)
