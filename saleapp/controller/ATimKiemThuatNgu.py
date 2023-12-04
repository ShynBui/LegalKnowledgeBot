from flask import jsonify, request
from saleapp import dao
import math
from saleapp.config import PER_PAGE
# from config import vncorenlp
import pandas as pd
import os
from saleapp import app


def get_terminology():
    kw = request.args.get('kw', default=None, type=str)
    page = request.args.get('page', default=1, type=int)

    results = dao.get_terminology(kw, page)
    count = dao.count_terminology(kw)
    total_pages = math.ceil(count / PER_PAGE)

    reponse = jsonify({
        "total_pages": total_pages,
        "total_terminologies": count,
        "terminologies": [result.to_dict() for result in results]
    })

    return reponse, 200


def search_terminology_form_paragraph():
    paragraph = request.json.get("paragraph", None)
    if paragraph is None:
        return jsonify({"msg": "empty"}), 204
    file_path = os.path.join(app.root_path, 'data', 'full_thuat_ngu_procesing_v3.csv')
    data_terminologies = pd.read_csv(file_path)

    words = []
    for row in data_terminologies.iloc:
        if row['thuatngu']:
            if is_existed(row['thuatngu'].lower().strip(), paragraph):
                words.append({'word': row['thuatngu'], 'mean': row['mota']})
        print("err")

    return jsonify(words), 200




def is_existed(w, nouns_list):
    if (w in nouns_list):
        return True
    return False

