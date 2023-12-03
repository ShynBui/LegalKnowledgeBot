import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyUserReducer from '@c/MyUserReducer';
import { useReducer } from 'react';
import cookie from 'react-cookies';

import Button from '@mui/material/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import AuthModal from './AuthModal';
import { get, post } from '~/utils/request';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
let cx = classNames.bind(styles);

const ModalWrapper = ({ show, children }) => {
    return <div className={cx('modal-wrapper', { show })}>{children}</div>;
};

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);
    const [infoUser, setInfoUser] = useState([]);
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [showLoading, setShowLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();
    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [infoUserLogin, setInfoUserLogin] = useState({});
    const [ErrorUserNameEmail, setErrorUserNameEmail] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    useEffect(() => {
        setOpen(false);
    }, [user]);
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
        setShowRegister(false);
        setShowModal(false);
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const process = async () => {
            try {
                let res = await post('/login', infoUserLogin);

                console.log(res);
                cookie.save('token', res);

                const headers = {
                    Authorization: `Bearer ${cookie.load('token')}`,
                };

                const data = await get('/current-user', {
                    headers: headers,
                });
                console.log(data);

                cookie.save('user', data);
                setShowModal(false);

                dispatch({
                    type: 'login',
                    payload: data,
                });
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert('Sai thông tin đăng nhập!');
            }
        };

        process();
    };
    const handleSubmit = () => {};
    const handleLogin = () => {};

    const handleLogout = () => {};

    console.log(infoUserLogin);
    return (
        <>
            <ModalWrapper show={showModal}>
                <div className={cx('modal-inner')}>
                    <h2>Đăng nhập bằng </h2>
                    {loginFailed && <h2 style={{ fontSize: '16px', color: 'red' }}>Tài khoản hoặc mật khẩu sai !</h2>}
                    <span className={cx('cancel', 'material-icons')} onClick={handleCancel}>
                        cancel
                    </span>
                    <div className="d-flex g-2 justify-content-center">
                        <div id="signInGoogle">
                            <></>
                        </div>
                    </div>
                    <p className="mt-3">hoặc</p>

                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="login-email" className="form-label">
                                Tên người dùng hoặc email
                            </label>
                            <input
                                onChange={(e) => setInfoUserLogin({ ...infoUserLogin, username: e.target.value })}
                                type="text"
                                className="form-control"
                                id="login-email"
                                placeholder="Tên tài khoản..."
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="login-password" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                onChange={(e) => setInfoUserLogin({ ...infoUserLogin, password: e.target.value })}
                                type="password"
                                className="form-control"
                                id="login-password"
                                placeholder="Mật khẩu..."
                            />
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <input type="checkbox" id="login-remember" name="login-remember" />
                                <label htmlFor="login-remember">Ghi nhớ tôi</label>
                            </div>
                            <Link to="/">Quên mật khẩu</Link>
                        </div>
                        <Button onClick={handleSubmitLogin} className="w-100 mt-3">
                            ĐĂNG NHẬP
                        </Button>
                    </form>
                    <p
                        className="text-center mt-3"
                        onClick={() => {
                            setShowRegister(true);
                        }}
                    >
                        Đây là lần đầu tiên của bạn?&nbsp;
                        <b style={{ cursor: 'pointer' }}>Đăng ký ngay</b>
                    </p>
                </div>
            </ModalWrapper>

            <ModalWrapper show={showRegister}>
                <div className={cx('modal-inner')} style={{ height: '550px' }}>
                    <h2>Đăng ký</h2>
                    {errorMessage && (
                        <h2 style={{ fontSize: '18px', color: 'red', fontWeight: '600' }}>
                            Xác nhận mật khẩu không đúng !!
                        </h2>
                    )}
                    <span className={cx('cancel', 'material-icons')} onClick={handleCancel}>
                        cancel
                    </span>
                    {ErrorUserNameEmail && (
                        <h2 style={{ fontSize: '18px', color: 'red', fontWeight: '600' }}>
                            Tên người dùng hoặc email đã được sử dụng{' '}
                        </h2>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="register-username" className="form-label">
                                Tên người dùng của bạn
                            </label>
                            <input
                                value={userName}
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                className="form-control"
                                id="register-username"
                                placeholder="username"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="register-email" className="form-label">
                                Email của bạn
                            </label>
                            <input
                                value={userEmail}
                                type="email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="form-control"
                                id="register-email"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="register-password" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="register-password"
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="register-confirm-password" className="form-label">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="register-confirm-password"
                            />
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <label htmlFor="acp-policy" style={{ marginRight: '10px' }}>
                                    Bạn đã đọc và đồng ý <Link to="/">điều khoản</Link> của Ba Tô Phở{' '}
                                </label>
                                <input
                                    onChange={() => setCheckbutton(!checkButton)}
                                    type="checkbox"
                                    id="acp-policy"
                                    name="acp-policy"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-100 mt-3" disabled={!isFormValid} onClick={handleSubmit}>
                            {' '}
                            <h1 className={cx('register')}>
                                ĐĂNG KÝ{' '}
                                {showLoading && <span className={cx('loading', 'material-icons')}>refresh</span>}
                            </h1>
                        </Button>
                    </form>
                    <p className="text-center mt-3" style={{ paddingBottom: '20px' }}>
                        Bạn đã có tài khoản?&nbsp;
                        <b style={{ cursor: 'pointer' }} onClick={handleLogin}>
                            Đăng nhập
                        </b>
                    </p>
                </div>
            </ModalWrapper>
            <header className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img
                            src="/src/assets/logo.png"
                            alt="Logo"
                            className="w-150 h-100"
                            style={{ borderRadius: '50%' }}
                        />
                    </Link>
                    <h1 style={{ fontSize: '20px' }}>CodeHeroes</h1>
                </div>
                <div className={cx('d-flex align-items-center')} style={{ height: '40%', width: '100%' }}></div>

                <div className={cx('actions')}>
                    {user ? (
                        <>
                            <Link to="/diendan">
                                <Button className="me-5 btn btn-warning border">Diễn đàn</Button>
                            </Link>

                            <Link to="/chat">
                                <Button className="me-5 btn btn-primary border">Chat ngay</Button>
                            </Link>

                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Link style={{ color: 'black' }} to={`/profile/`}>
                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                {/* <img className={cx('user_avatar')} src={user.} alt="" /> */}
                                            </Avatar>
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    size="small"
                                    variant="contained"
                                    color="inherit"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                className="me-2"
                                color="info"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                Đăng nhập
                            </Button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
