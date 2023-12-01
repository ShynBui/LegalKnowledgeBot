from saleapp import app, db
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from saleapp.models import *


admin = Admin(app = app, name="Hệ thống pháp luật pháp điển ", template_mode='bootstrap4')

class UserView(ModelView):
    can_view_details = True
    can_export = True
    column_searchable_list = ['mssv']

class ChuongVaDieuView(ModelView):
    can_view_details = True
    can_export = True

    column_searchable_list = ['ten']
    column_exclude_list = ['chi_muc', 'mapc']
    column_labels = {'ten' : 'Tên',
                     'chi_muc': 'Chỉ mục'

                     }
    column_sortable_list = ['id', 'ten']

admin.add_view(ModelView(User, db.session, 'Người dùng'))
admin.add_view(ChuongVaDieuView(ChuongVaDieuPhapDien, db.session, 'Chương và điều'))
admin.add_view(ModelView(DeMucPhapDien, db.session, 'Đề mục'))
admin.add_view(ModelView(ChuDePhapDien, db.session, 'Chủ đề'))
admin.add_view(ModelView(ThuatNgu, db.session, 'Thuật Ngữ'))
