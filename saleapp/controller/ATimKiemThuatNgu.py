from flask import jsonify, request
from saleapp import dao
import math
from saleapp.config import PER_PAGE
# from config import vncorenlp
import pandas as pd
import os
from saleapp import app
from pyvi import ViTokenizer, ViPosTagger
import time
import requests
API_URL = "https://api-inference.huggingface.co/models/ShynBui/text_classification"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def get_label(x):
    output = query({
      "inputs": ViTokenizer.tokenize(x),
    })
    while "error" in output:
        
        time.sleep(1)
        output = query({
          "inputs": {
            "inputs": ViTokenizer.tokenize(x),
          },
        })
    return output[0][0]['label']



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
    data_thuat_ngu = pd.read_csv(file_path)
    nouns = get_nouns(paragraph)
    result = map(lambda x: x.replace("_", " ").lower(), nouns)
    result = list(set(result))
    data_thuat_ngu['thuatngu_lower'] = data_thuat_ngu['thuatngu'].map(lambda x: x.lower())
    words = data_thuat_ngu['thuatngu_lower'].map(lambda x : is_in(x, result))
    result_x = [x for x in words if x != -1]
    result_x = list(set(result_x))

    words = result_x
    
    data_thuat_ngu['label'] = data_thuat_ngu['thuatngu_lower'].map(lambda x : 1 if x in words else 0)
    
    my_new = data_thuat_ngu[data_thuat_ngu['label'] == 1]
        
    # for row in data_terminologies.iloc:
    #     if row['thuatngu']:
    #         if is_existed(row['thuatngu'].lower().strip(), paragraph):
    #             words.append({'word': row['thuatngu'], 'mean': row['mota']})
    #     print("err")
        
    words = {'word': my_new['thuatngu_lower'], 'mean': my_new['mota']}
    print(words)
   

    return jsonify(words), 200


def get_nouns(sentence):
    nouns = []
    annotated_sentence = ViPosTagger.postagging(ViTokenizer.tokenize(sentence))
    # print(annotated_sentence[0])
    for i in range(len(annotated_sentence[0])):
        if annotated_sentence[1][i].startswith('N'):
            nouns.append(annotated_sentence[0][i])
    nouns =  list(set(nouns))
    return nouns

def find_sentence_with_word(sentences, words):
    result_words = []
    result_sentenecs = []
    for word in words:
        for s in sentences:
            if word in s:
                result_words.append(word)
                result_sentenecs.append(s)
    return pd.DataFrame({'word' : result_words,
                        'sentence': result_sentenecs})

def check_at_start_of_sentence(word, sentence):

    if sentence.startswith(word):
        return 1
    return 0

def api_search_maybe_term():
    paragraph = request.json.get('paragraph')
    try:
        file_path = os.path.join(app.root_path, 'data', 'full_thuat_ngu_procesing_v3.csv')
        data_thuat_ngu = pd.read_csv(file_path)
        data_thuat_ngu['thuatngu_lower'] = data_thuat_ngu['thuatngu'].map(lambda x : x.lower().strip())
        nouns = get_nouns(paragraph)
        result = map(lambda x: x.replace("_", " ").lower(), nouns)
        result = list(set(result))
        words = data_thuat_ngu['thuatngu_lower'].map(lambda x : is_in(x, result))
        result_x = [x for x in words if x != -1]
        result_x = list(set(result_x))
        all_sentences = paragraph.split('.')
        all_sentences = list(map(lambda x : x.strip().lower(), all_sentences))
        find_data = find_sentence_with_word(all_sentences, result)
        my_list = list(set(result) - set(result_x))
        find_data['drop'] = find_data['word'].map(lambda x : -1 if (x in my_list) else 1)
        find_data = find_data[find_data['drop'] != -1]
        find_data['drop'] = find_data.apply(lambda x : check_at_start_of_sentence(x['word'] , x['sentence']), axis = 1)
        find_data = find_data[find_data['drop'] != 0]
        find_data['sentences'] = find_data['sentence']
        find_data['label'] = find_data['drop']
        find_data['label'] = find_data['sentences'].map(lambda x : get_label(x))
        find_data = find_data[find_data['label'] == 'POSITIVE']
        print(find_data['sentences'])
        if not find_data['sentences'].empty:

            sentences_list = find_data['sentences'].str.split(',').tolist()
     
            return jsonify({
                'sentences': sentences_list
            })
        else:
            return jsonify({
                'sentences': []
            })
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'error': 'An error occurred while processing the request.'
        }), 500 
        

def is_existed(w, nouns_list):
    if (w in nouns_list):
        return True
    return False

def is_in(x, data_thuat_ngu_2):
    if (x in data_thuat_ngu_2):
        return x
    return -1
