import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

import classNames from 'classnames/bind';
import styles from '../../css/LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const sendLoginRequest = () => {

        const requestBody = {
            idAccount: undefined,
            email: email,
            password: password,
            name: null
        }

        if (password.includes("admin")) {
            fetch('http://localhost:8080/admin-account/login', {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .then(res => res.json())
                .then(data => {
                    sessionStorage.setItem("user", data.name);
                    sessionStorage.setItem("id", data.idAccount)
                    sessionStorage.setItem("role", "admin")
                    navigate(config.route.admin)
                })
                .catch(err => console.log(err))
        } else {
            fetch('http://localhost:8080/user-account/login', {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .then(res => res.json())
                .then(data => {
                    sessionStorage.setItem("user", data.name);
                    sessionStorage.setItem("id", data.idAccount)
                    sessionStorage.setItem("role", "user")
                    navigate(config.route.user)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className={cx('body')}>
            <div className={cx('login-wrapper')}>
                <Link id={cx('exit-login')} to={config.route.home}>
                    <FontAwesomeIcon icon={faXmark} />
                </Link>
                <h1>Đăng Nhập</h1>
                <div>
                    <div className={cx('login-info')}>
                        <label>
                            <input type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <input type="password" placeholder='Mật Khẩu' onChange={e => setPassword(e.target.value)} />
                        </label>
                        <br></br>
                        Chưa có tài khoản? <Link to={config.route.signup}>Đăng ký</Link>
                    </div>
                    <div className={cx('btn')}>
                        <button type="submit" onClick={sendLoginRequest}>Đăng nhập</button>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default LoginPage;