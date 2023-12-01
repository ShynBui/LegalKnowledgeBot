import unittest
from saleapp import dao, app

app.app_context().push()

class TestUserFunc(unittest.TestCase):

    def test_get_user_by_id(self):
        user_data = {
            "id": 1,
            "username": "user",
            "email": "hoangbrato@gmail.com"

        }
        user = dao.get_user_by_id(1)
        self.assertIsNotNone(user)
        self.assertEqual(user.id, user_data["id"])
        self.assertEqual(user.username, user_data["username"])
        self.assertEqual(user.email, user_data["email"])


    def test_check_login_notNull(self):
        username_test = 'user'
        password_test = '123'
        user = dao.check_login(username_test,password_test)
        self.assertIsNotNone(user)

    def test_check_login_null(self):
        username_test = 'fake_user'
        password_test = '123'
        user = dao.check_login(username_test, password_test)
        self.assertIsNone(user)

    def test_add_user_false(self):
        user = dao.add_user_api(name="test_false", username="user", password="123")
        print("user ne", user)
        self.assertFalse(user)

    def test_add_user_true(self):
        user = dao.add_user_api(name="testTrue", username="test_true", password="123")
        self.assertIsNotNone(user)
        dao.delete_user_by_username(username="test_true")

if __name__ == '__main__':
    unittest.main()