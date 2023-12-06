# import chromadb
# from flask import jsonify, request
# from saleapp.dao import *
# from flask_jwt_extended import jwt_required, current_user
# from saleapp import app
# import os 
# from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
# from langchain.docstore.document import Document
# from pyvi import ViTokenizer, ViPosTagger
# from langchain.retrievers import BM25Retriever, EnsembleRetriever
# import requests
# from langchain.vectorstores import Chroma
# from langchain.embeddings import HuggingFaceEmbeddings
# import pandas as pd

# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")


# API_URL = os.getenv('API_URL')
# headers = {"Authorization": "Bearer " + os.getenv('TOKEN_HUGGING_FACE')}
# print(API_URL)

# def split_with_source(text, source):
#     splitter = CharacterTextSplitter(
#         separator = "\n",
#         chunk_size = 1200,
#         chunk_overlap  = 240,
#         length_function = len,
#         add_start_index = True,
#     )
#     documents = splitter.create_documents([text])
#     for doc in documents:
#         doc.metadata["source"] = source
#     return documents



# # [POST] - /api/chat-bot/

# def send_msg():
#     msg = request.json.get("msg")
#     sub_topic_id = request.json.get("sub_topic_id")
#     chat_room_id = request.json.get("room_id", None)
#     file_path = os.path.join(app.root_path, 'data', sub_topic_id)
#     print(file_path)
#     if os.path.exists(file_path):
#         documents = [Document(page_content="", metadata={'source': 0})]
#         files = os.listdir(file_path)
#         for file in files:
#             full_path = os.path.join(file_path, file)
#             print(file)
#             if os.path.isfile(full_path):
#                 with open(full_path, 'r') as f:
#                     content = f.read().replace('\n\n', "\n")
#                     texts = split_with_source(content, file)
#                     documents = documents +texts
#         retriever = Chroma.from_documents(documents, embedding=embeddings).as_retriever(
#             search_kwargs={"k": 5}
#         )
#         bm25_retriever = BM25Retriever.from_documents(documents)
#         bm25_retriever.k = 5
#         ensemble_retriever = EnsembleRetriever(
#             retrievers=[bm25_retriever, retriever], weights=[0.5, 0.5]
#         )
#         docs = ensemble_retriever.get_relevant_documents("Các biện pháp bảo vệ dữ liệu cá nhân là gì?")
#         result = []
        
#         import time
#         for i in docs:
#             context = ViTokenizer.tokenize(i.page_content)
#             question = ViTokenizer.tokenize("Cơ quan chủ trì có trách nhiệm gì?")
#             output = query({
#             "inputs": {
#                 "question": question,
#                 "context": context
#             },
#             })
#             step = 0  
#             while "error" in output and step < 1000000:
#                 print('fail')
#                 step += 1
#                 time.sleep(1)
#                 output = query({
#                 "inputs": {
#                     "question": question,
#                     "context": context
#                 },
#                 })
                
#             if "error" not in output:
#                 if output['score'] >= 0.7:
#                     result.append({
#                         'answer': output['answer'],
#                         'scores': output['score'],
#                         'sources': i.metadata['source']
#                     })
        
      
        
#         my_answer = pd.DataFrame(result)                
#         my_answer = my_answer.sort_values(by=['scores'])
#         best_answer = my_answer.iloc[0]
        
    
#         if chat_room_id is None:
#             room = add_chat_room(name=msg, user=current_user)
#             chat_room_id = room.id
        
#         user_message = add_message(chat_room_id=room.id, content=msg, is_user_message=True)
#         bot_message = add_message(chat_room_id=room.id, content=best_answer['answer'], is_user_message=False)
            
#         return jsonify({'bot_msg': bot_message.to_dict()}), 200
#     return jsonify({}), 404

        
        
# def query(payload):
# 	response = requests.post(API_URL, headers=headers, json=payload)
# 	return response.json()