from saleapp import dao, app


def test_get_user_by_id():
    fake_name = "Phát"

    user = dao.get_user_by_id(1)

    # Kiểm tra xem người dùng có tồn tại và có thuộc tính name không
    if user is not None:
        assert fake_name == user.name
    else:
        # Người dùng không tồn tại, hiển thị thông báo hoặc thực hiện các xử lý khác
        print("Người dùng không tồn tại.")
