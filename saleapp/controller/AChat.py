from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, current_user

from saleapp import app, jwt, dao

from flask import jsonify, request

from saleapp.models import User, UserRole

import os
from langchain.document_loaders import TextLoader


from langchain.text_splitter import CharacterTextSplitter
from pyvi import ViTokenizer
import requests
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.retrievers import BM25Retriever, EnsembleRetriever
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")


API_URL = "https://api-inference.huggingface.co/models/ShynBui/vie_qa"
headers = {"Authorization": "Bearer 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"}


def tin_nhan_serializer(tin_nhan):
    return {
        'id': tin_nhan.id,
        'noi_dung': tin_nhan.noi_dung,
        'thoi_gian_tao': tin_nhan.thoi_gian_tao,
        'user_id': tin_nhan.user_id,
        'nguon': tin_nhan.nguon
    }



def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def split_with_source(text, source):
    splitter = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 1200,
        chunk_overlap  = 240,
        length_function = len,
        add_start_index = True,
    )
    documents = splitter.create_documents([text])
    for doc in documents:
        doc.metadata["source"] = source
        # print(doc.metadata)

    return documents

@jwt_required()
def get_tin_nhan_api():
    tin_nhan_list = dao.get_tin_nhan_by_user_id(current_user.id)
    serialized_list_tin_nhan = [tin_nhan_serializer(tin_nhan) for tin_nhan in
                                          tin_nhan_list]
    return jsonify(serialized_list_tin_nhan)


from langchain.docstore.document import Document

@jwt_required()
def add_tin_nhan_api():
    noi_dung = request.json.get('noi_dung')
    de_muc_id = request.json.get('de_muc_id')
    path =os.path.join(app.root_path, 'data/{}.txt'.format(de_muc_id))
    sources = dao.get_source_by_de_muc_id(de_muc_id)
    documents = [Document(page_content="", metadata={'source': 0})]
    file_path = path
    with open(file_path, 'r') as file:
        content = file.read().replace('\n\n', "\n")
        new_doc = content
        texts = split_with_source(new_doc, sources)
        documents = documents +texts
     
    print(documents)
    if noi_dung and not noi_dung.endswith('?'):
        noi_dung += '?'
    
    retriever = Chroma.from_documents(documents, embedding=embeddings).as_retriever(
    search_kwargs={"k": 5}
)
    
    bm25_retriever = BM25Retriever.from_documents(documents)
    bm25_retriever.k = 5
    
    ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, retriever], weights=[0.5, 0.5]
)
    
    docs = ensemble_retriever.get_relevant_documents(noi_dung)
    

    result = []
    step=0
    import time
    for i in docs:
        context = ViTokenizer.tokenize(i.page_content)
        question = ViTokenizer.tokenize(noi_dung)
        output = query({
        "inputs": {
            "question": question,
            "context": context
        },
        })
        
        while "error" in output:
            print('fail')
            time.sleep(1)
            step += 1
            output = query({
            "inputs": {
                "question": question,
                "context": context
            },
            })
            
        result.append({
            'answer': output['answer'],
            'scores': output['score'],
            'sources': i.metadata['source']
        })
        print(result)
        best_answer = {}
        for r in result:
            if not best_answer:
                best_answer = r
            elif r.get('scores') > best_answer.get('scores'):
                    best_answer = r
                  
        if best_answer:
            tin_nhan_nguoi_dung = dao.add_tin_nhan(noi_dung=noi_dung, user_id=current_user.id)
            bot_message = dao.add_tin_nhan(noi_dung=best_answer.get('answer'), user_id=current_user.id, nguon=best_answer.get('sources'))
            return jsonify(tin_nhan_serializer(bot_message)), 200
    return jsonify({}), 404