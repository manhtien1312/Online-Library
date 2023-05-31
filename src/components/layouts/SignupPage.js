import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '../../config'

import classNames from 'classnames/bind';
import styles from '../../css/SignupPage.module.scss';

const cx = classNames.bind(styles);

const SignupPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordAgain, setPasswordAgain] = useState();

    const [check, setCheck] = useState(true);

    useEffect(() => {
        if (passwordAgain === password) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [password, passwordAgain])

    const handleSubmit = () => {

        const requestBody = {
            idAccount: undefined,
            email: email,
            password: password,
            name: name
        }

        fetch('http://localhost:8080/user-account/signup', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .then(navigate(config.route.login))
            .catch(err => console.log(err))

    }

    return (
        <div className={cx('body')}>
            <div className={cx('wrapper')}>
                <Link id={cx('exit')} to={config.route.home}>
                    <FontAwesomeIcon icon={faXmark} />
                </Link>
                <h1>Đăng Ký</h1>
                <div>
                    <div className={cx('info')}>
                        <label>
                            <input type="text" placeholder='Tên Đầy Đủ' onChange={e => setName(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <input type="password" placeholder='Mật Khẩu' onChange={e => setPassword(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <input type="password" placeholder='Xác Nhận Mật Khẩu' onChange={e => setPasswordAgain(e.target.value)} />
                        </label>
                        <br></br>
                    </div>
                    {!check && (
                        <p>Mật khẩu không trùng khớp</p>
                    )}
                    <div className={cx('btn')}>
                        <button type="submit" onClick={handleSubmit}>Đăng Ký</button>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default SignupPage;