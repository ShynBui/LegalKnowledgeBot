from flask import render_template, request, redirect, session, jsonify, url_for
from flask_login import login_user, current_user, logout_user
from saleapp import app, login
import dao
from saleapp.routes.api import api
import cloudinary.uploader
@app.route("/")
def index():
    return render_template("index.html")

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


if __name__ == "__main__":

    app.run(debug=True, port=5050)
