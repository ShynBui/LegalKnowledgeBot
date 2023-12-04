from elasticsearch import Elasticsearch

es = Elasticsearch("https://localhost:9200", verify_certs=False, http_auth=('elastic', 'P_llZlwyNkd6QwcIiqs9'))

print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

import requests
from bs4 import BeautifulSoup

url = 'https://luatminhkhue.vn/bo-luat-hinh-su-la-gi.aspx'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

body_text = [i.lower() for i in soup.find('body').text.split('\n') if i != '']

for i in soup.find('body').text.split('\n'):
    if i != '':
        document = {
            'body_text': i.lower(),
        }
        es.index(index="webpages", body=document)



# query = request.args["q"].lower()
query = "Bộ luật hình sự là gì ?"
tokens = query.split(" ")

clauses = [
        {
            "span_multi": {
                "match": {
                    "fuzzy": {
                        "body_text": {
                            "value": i,
                            "fuzziness": "AUTO"
                        }
                    }
                }
            }
        }
        for i in tokens
    ]

payload = {
    "bool": {
        "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
    }
}

MAX_SIZE=30
results = es.search(index="webpages", query=payload, size=MAX_SIZE)

for result in results['hits']['hits']:
    print(result['_source']['body_text'])