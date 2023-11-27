import hashlib
import pandas as pd
from saleapp.models import *



def add_chuDe(filename):
    df = pd.read_csv(filename)

    return df['Value'].tolist(), df['Text'].tolist(), df['STT'].tolist()

def import_chuDe():
    value, text, stt = add_chuDe(
        '/home/duchoang/Workspace/MaNguonMo2023/backend/saleapp/data/Chude_table.csv')

    for i in range(len(value)):
        db.session.add(ChuDePhapDien(id=value[i], stt=stt[i], text = text[i]))
        db.session.commit()