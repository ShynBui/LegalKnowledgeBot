# from googlesearch import search
# from flask import Blueprint, jsonify, request
# from bs4 import BeautifulSoup
# import re
# from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
# from nltk import sent_tokenize
# import nltk
# import sys
# import requests
# from langchain.docstore.document import Document
# from langchain.vectorstores import Chroma
# from langchain.embeddings import HuggingFaceEmbeddings
# import pandas as pd
# from langchain.vectorstores import Chroma
# from langchain.retrievers import BM25Retriever, EnsembleRetriever
# from pyvi import ViTokenizer, ViPosTagger
# import time
#
# API_URL = "https://api-inference.huggingface.co/models/ShynBui/vie_qa"
# headers = {"Authorization": "Bearer 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"}
# documents = [Document(page_content="", metadata={'source': 0})]
# nltk.download('punkt')
# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
#
#
# def make_query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response.json()
#
#
# def api_search_gg():
#     query = "Bộ luật hình sự là gì ?"
#     num_results = 3
#     sources, answers, scores, ids = [], [], [], []
#     search_results = search(query, num_results=num_results, lang='vi')
#     links = []
#     for result in search_results:
#         print(result)  # Print the URL of each search result
#         links.append(result)
#
#     for i in links:
#         content = getContent(i)
#         new_doc = remove_escape_sequences(content)
#         texts = split_with_source(new_doc, i)
#         documents.extend(texts)
#
#     retriever = Chroma.from_documents(documents, embedding=embeddings).as_retriever(
#         search_kwargs={"k": 3}
#     )
#     bm25_retriever = BM25Retriever.from_documents(documents)
#     bm25_retriever.k = 3
#     ensemble_retriever = EnsembleRetriever(
#         retrievers=[bm25_retriever, retriever], weights=[0.5, 0.5]
#     )
#
#     docs = ensemble_retriever.get_relevant_documents("Bộ luật hình sự quy định gì ?")
#     for i in docs:
#         context = ViTokenizer.tokenize(i.page_content)
#         question = ViTokenizer.tokenize("Bộ luật hình sự là gì ?")
#         print("source:", i.metadata['source'])
#         sources.append(i.metadata['source'])
#         output = make_query({
#             "inputs": {
#                 "question": question,
#                 "context": context
#             },
#         })
#
#         while "error" in output:
#             print('fail')
#             time.sleep(1)
#             output = make_query({
#                 "inputs": {
#                     "question": question,
#                     "context": context
#                 },
#             })
#         answers.append(output['answer'])
#         scores.append(output['score'])
#         ids.append(i.metadata['source'])
#         print(output, i)
#     my_result = pd.DataFrame({
#         "sources": sources,
#         "answers": answers,
#         "scores": scores,
#         'ids': ids
#     })
#     my_result = my_result[my_result['scores'] >= 0.5]
#     for index, row in my_result.iterrows():
#         print(f"Source: {row['sources']}, Answer: {row['answers']}, Score: {row['scores']}, ID: {row['ids']}")
#
#     return jsonify(my_result.to_dict(orient='records')), 200
#
#
#
# def chunks(l, n):
#     for i in range(0, len(l), n):
#         yield l[i:i + n]
#
#
# def getContent(url):
#     try:
#         html = requests.get(url, timeout=4)
#         tree = BeautifulSoup(html.text, 'lxml')
#         for invisible_elem in tree.find_all(['script', 'style']):
#             invisible_elem.extract()
#
#         paragraphs = [p.get_text() for p in tree.find_all("p")]
#
#         for para in tree.find_all('p'):
#             para.extract()
#
#         for href in tree.find_all(['a', 'strong']):
#             href.unwrap()
#
#         tree = BeautifulSoup(str(tree.html), 'lxml')
#
#         text = tree.get_text(separator='\n\n')
#         text = re.sub('\n +\n', '\n\n', text)
#
#         paragraphs += text.split('\n\n')
#         paragraphs = [re.sub(' +', ' ', p.strip()) for p in paragraphs]
#         paragraphs = [p for p in paragraphs if len(p.split()) > 10]
#
#         for i in range(0, len(paragraphs)):
#             sents = []
#             text_chunks = list(chunks(paragraphs[i], 100000))
#             for chunk in text_chunks:
#                 sents += sent_tokenize(chunk)
#
#             sents = [s for s in sents if len(s) > 2]
#             sents = ' . '.join(sents)
#             paragraphs[i] = sents
#
#         return '\n\n'.join(paragraphs)
#     except:
#         print('Cannot read ' + url, str(sys.exc_info()[0]))
#         return ''
#
#
# def split_with_source(text, source):
#     splitter = CharacterTextSplitter(
#         separator=".",
#         chunk_size=1200,
#         chunk_overlap=240,
#         length_function=len,
#         add_start_index=True,
#     )
#     documents = splitter.create_documents([text])
#     for doc in documents:
#         doc.metadata["source"] = source
#         # print(doc.metadata)
#
#     return documents
#
#
# escape_sequences = ['\a', '\b', '\f', '\n\n', '\r', '\t', '\v', '\\', '\\\\', '\"', '\?', '\ooo', '\0', '\xa0']
#
#
# def remove_escape_sequences(string):
#     for i in escape_sequences:
#         string = string.replace(i, ' ')
#     return string
