import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyUserReducer from '@c/MyUserReducer';
import { useReducer } from 'react';
import cookie from 'react-cookies';

import Button from '@mui/material/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import AuthModal from './AuthModal';

let cx = classNames.bind(styles);

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);

    useEffect(() => {
        setOpen(false);
    }, [user]);

    return (
        <>
            <header className={cx('wrapper', 'w-100 flex-center justify-content-between top-0 position-fixed z-2')}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className={cx('logo', 'flex-center')}>
                        {/* <img src={Logo} alt="CodeHeroes" className="rounded-circle h-100 w-100" /> */}
                        <b className={cx('logo-text')}>CodeHeroes</b>
                    </button>
                </Link>
                <div className="d-flex g-5">
                    {user ? (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                dispatch({
                                    type: 'logout',
                                });
                            }}
                        >
                            Đăng xuất
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={handleOpen}>
                            Đăng nhập
                        </Button>
                    )}
                    <AuthModal open={open} handleClose={handleClose} />
                </div>
            </header>
            <header className={cx('wrapper', 'w-100 flex-center justify-content-between top-0 position-fixed z-2')} style={{marginTop:'-500px'}}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className={cx('logo', 'flex-center')}>
                        {/* <img src={Logo} alt="CodeHeroes" className="rounded-circle h-100 w-100" /> */}
                        <b className={cx('logo-text')}>CodeHeroes</b>
                    </button>
                </Link>
                <div className="d-flex g-5">
                    {user ? (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                dispatch({
                                    type: 'logout',
                                });
                            }}
                        >
                            Đăng xuất
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={handleOpen}>
                            Đăng nhập
                        </Button>
                    )}
                    <AuthModal open={open} handleClose={handleClose} />
                </div>
            </header>
           
        
    
        </>
    );
};

export default Header;
