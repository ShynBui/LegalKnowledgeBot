from flask import render_template, request, redirect, session, jsonify, url_for
from flask_login import login_user, current_user, logout_user
from saleapp import app, login
from saleapp.routes.api import api


app.register_blueprint(api, url_prefix='/api')


if __name__ == "__main__":

    app.run(debug=True, port=5050)
