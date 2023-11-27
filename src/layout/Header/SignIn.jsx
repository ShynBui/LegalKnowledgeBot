import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import cookie from 'react-cookies';

import { useReducer, useState } from 'react';
import MyUserReducer from '@c/MyUserReducer';
import { get, post } from '~/utils/request';

const SignIn = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);
    const [formDataLogin, setFormDataLogin] = useState({
        username: '',
        password: '',
    });
    const [infoUser, setInfoUser] = useState();
    console.log(formDataLogin);
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const process = async () => {
            try {
                let res = await post('/api/login', formDataLogin);

                console.log('res', res.data);
                cookie.save('token', res.data);

                const headers = {
                    Authorization: `Bearer ${cookie.load('token')}`,
                };
                console.log(headers);
                const data = await get('/api/current-user', {
                    headers: headers,
                });

                setInfoUser({
                    name: data.data.name,
                });
                cookie.save('user', data.data);

                dispatch({
                    type: 'login',
                    payload: res.data,
                });
            } catch (err) {
                console.error(err);
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
                        id="username"
                        name="username"
                        label="Tài khoản"
                        placeholder="Tài khoản của bạn"
                        variant="outlined"
                        onChange={(e) => setFormDataLogin({ ...formDataLogin, username: e.target.value })}
                    />
                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        placeholder="••••••••••"
                        onChange={(e) => setFormDataLogin({ ...formDataLogin, password: e.target.value })}
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
