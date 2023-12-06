from elasticsearch import Elasticsearch
import requests
from bs4 import BeautifulSoup
import sys
import re
from nltk import sent_tokenize
import nltk
import warnings
from pyvi import ViTokenizer, ViPosTagger

nltk.download('punkt')
warnings.filterwarnings("ignore")

es = Elasticsearch("https://localhost:9200", verify_certs=False,
                   http_auth=('elastic', 'P_llZlwyNkd6QwcIiqs9'))

print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

url = "https://iluatsu.com/tu-dien-luat-hoc/"


def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]


def getContent(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0'}
        html = requests.get(url, timeout=5, headers=headers)
        tree = BeautifulSoup(html.text, 'lxml')
        for invisible_elem in tree.find_all(['script', 'style']):
            invisible_elem.extract()

        paragraphs = [p.get_text() for p in tree.find_all("p")]

        for para in tree.find_all('p'):
            para.extract()

        for href in tree.find_all(['a', 'strong']):
            href.unwrap()

        tree = BeautifulSoup(str(tree.html), 'lxml')

        text = tree.get_text(separator='\n\n')
        text = re.sub('\n +\n', '\n\n', text)

        paragraphs += text.split('\n\n')
        paragraphs = [re.sub(' +', ' ', p.strip()) for p in paragraphs]
        paragraphs = [p for p in paragraphs if len(p.split()) > 10]

        for i in range(0, len(paragraphs)):
            sents = []
            text_chunks = list(chunks(paragraphs[i], 100000))
            for chunk in text_chunks:
                sents += sent_tokenize(chunk)

            sents = [s for s in sents if len(s) > 2]
            sents = ' . '.join(sents)
            paragraphs[i] = sents

        print("Get content successfully")

        return "\n\n".join(paragraphs).replace("\xa0", ' ')

    except Exception:
        print('Cannot read ' + url, str(sys.exc_info()[0]))
        return ''


def get_nouns(sentence):
    nouns = []
    annotated_sentence = ViPosTagger.postagging(ViTokenizer.tokenize(sentence))
    for i in range(len(annotated_sentence[0])):
        if annotated_sentence[1][i].startswith('N'):
            nouns.append(annotated_sentence[0][i].replace("_", " "))
    nouns = list(set(nouns))
    print(nouns)
    return nouns


def indexing(idx):
    for i in getContent(url).split('\n\n'):
        if i != '':
            document = {
                'body_text': i.lower(),
            }
            es.index(index=idx, document=document)


query = "án phí là gì?"
tokens = get_nouns(query)

clauses = [{
    "match": {
        "body_text": i
    }
} for i in tokens]

payload = {
    "bool": {
        "must": clauses
    }
}

index = "law"
# indexing(index)

MAX_SIZE = 6
results = es.search(index=index, query=payload, size=MAX_SIZE)

for result in results['hits']['hits']:
    print(result['_source']['body_text'])
    print("="*10)
