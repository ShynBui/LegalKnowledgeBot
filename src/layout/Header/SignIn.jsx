import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import cookie from 'react-cookies';

import { useReducer, useState } from 'react';
import MyUserReducer from '@c/MyUserReducer';
import { post } from '~/utils/request';

const SignIn = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);
    const [formDataLogin, setFormDataLogin] = useState({
        username: 'test',
        password: '123',
    });

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const process = async () => {
            try {
                let res = await post('/api/login', formDataLogin);

                console.log(res.data);
                cookie.save('token', res.data);

                const headers = {
                    Authorization: cookie.load('token'),
                };

                // const data = await get('/api/current-user/', {
                //     headers: headers,
                // });
                // console.log(data);
                // setInfoUserLogin({
                //     name: data.data.ten,
                //     email: data.data.email,
                //     nganhtml: data.data.nganh,
                //     avt: data.data.avatar,
                // });
                // cookie.save('user', data);
                // setUserActive(true);
                // setShowModal(false);

                dispatch({
                    type: 'login',
                    payload: res.data,
                });
            } catch (err) {
                console.error(err);
                alert('Sai thông tin đăng nhập!');
            }
        };

        process();
    };

    return (
        <div className="flex-center">
            <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Đăng nhập</h1>
                <form className="d-flex flex-column g-5" onSubmit={handleSubmitLogin}>
                    <TextField
                        type="text"
                        id="email"
                        name="email"
                        label="Email Address"
                        placeholder="me@example.com"
                        variant="outlined"
                    />
                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        placeholder="••••••••••"
                    />
                    <Button type="submit" variant="contained">
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
