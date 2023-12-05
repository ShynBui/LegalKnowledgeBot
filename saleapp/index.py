from flask import render_template, request, redirect, session, jsonify, url_for
from flask_login import login_user, current_user, logout_user, login_required
from saleapp import HOST, app, login
from saleapp import dao
from saleapp.routes.api import api
import cloudinary.uploader

@app.route("/")
@login_required
def index():
    user = dao.get_user_by_id(current_user.id)
    return render_template("index.html", user=user)


@app.route("/user_login", methods=['get', 'post'])
def user_login():
    err_msg = ''

    if request.method.__eq__('POST'):
        username = request.form.get('username')
        password = request.form.get('password')
        user = dao.check_login(username, password)
        print(user)
        if user:
            login_user(user=user)
            return redirect(url_for('index'))
        else:
            err_msg = 'Username hoac password k chinh xac'
    return render_template('login.html', err_msg=err_msg)


@app.route("/register", methods=["get", "post"])
def register():
    if session.get("user"):
        return redirect(request.url)
    err_msg = ""
    if request.method == "POST":
        name = request.form.get("name")
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")
        email = request.form.get('email')
        avatar_path = None
        if password.strip() != confirm.strip():
            err_msg = "Mat khau khong khop"
        else:
            avatar = request.files.get('avatar')
            if avatar:
                res = cloudinary.uploader.upload(avatar)
                avatar_path = res['secure_url']
            if dao.add_user(name=name, username=username, password=password, email = email, avatar = avatar_path):
                return redirect(url_for("index"))
            else:
                err_msg = "Something Wrong!!!"

    return render_template("register.html", err_msg=err_msg)


@login.user_loader
def user_load(user_id):
    return dao.get_user_by_id(user_id=user_id)

app.register_blueprint(api, url_prefix='/api')

@app.route("/search", methods=["POST"])
def search():
    return {}

if __name__ == "__main__":
    from saleapp.admin import *
    app.run(debug=True, host=HOST, port=5050)
