import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Props } from '~/interfaces';
import AuthModal from './AuthModal';

let cx = classNames.bind(styles);

const Header: React.FC<Props> = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <header className={cx('wrapper', 'w-100 flex-center justify-content-between top-0 position-fixed z-2')}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button className={cx('logo', 'flex-center')}>
                    {/* <img src={Logo} alt="CodeHeroes" className="rounded-circle h-100 w-100" /> */}
                    <b className={cx('logo-text')}>CodeHeroes</b>
                </button>
            </Link>
            <div className="d-flex g-5">
                <Button variant="outlined" onClick={handleOpen}>
                    Đăng nhập
                </Button>
                <AuthModal open={open} handleClose={handleClose} />
            </div>
        </header>
    );
};

export default Header;
