import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faPenToSquare, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';
import Popper from './Popper'
import PopperItem from './PopperItem'
import config from '../config'

import classNames from 'classnames/bind';
import styles from '../css/Header.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

const Header = ({ adLogined, userLogined, to }) => {

    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const userName = sessionStorage.getItem("user");

    return (
        <div className={cx('header')}>
            <div className={cx('info')}></div>
            <div className={cx('container')}>

                <div className={cx('logo')}>
                    <Link to={to}><img src='https://cdn-icons-png.flaticon.com/512/4231/4231580.png' alt="logo" /></Link>
                </div>

                {
                    !adLogined && !userLogined &&
                    <div className={cx('action')}>
                        <Link to={config.route.login}><FontAwesomeIcon icon={faRightToBracket} /> Đăng nhập</Link>
                        <Link to={config.route.signup}><FontAwesomeIcon icon={faPenToSquare} /> Đăng ký</Link>
                    </div>
                }

                {
                    adLogined &&
                    <div className={cx('action')}>
                        <h3 className={cx('user-name')}>{userName}</h3>
                        <Tippy
                            content="Tooltip"
                            visible={visible} onClickOutside={hide}
                            interactive
                            placement='bottom-end'
                            render={attrs => (
                                <div className={cx('user-menu')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <button className={cx('change-password')}>
                                            <PopperItem title='Đổi mật khẩu' icon={<FontAwesomeIcon icon={faKey} />} />
                                        </button>
                                        <br />
                                        <button className={cx('logout')} onClick={() => sessionStorage.clear()}>
                                            <PopperItem title="Đăng xuất" to={config.route.home} icon={<FontAwesomeIcon icon={faRightFromBracket} />}/>
                                        </button>
                                    </Popper>
                                </div>
                            )}
                        >
                            <button className={cx('user-icon')} onClick={visible? hide:show}> 
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        </Tippy>
                    </div>
                }

                {
                    userLogined &&
                    <div className={cx('action')}>
                        <h3 className={cx('user-name')}>{userName}</h3>
                        <div className={cx('btn')}>
                            <Tippy
                                content="Tooltip"
                                visible={visible} onClickOutside={hide}
                                interactive
                                placement='bottom-end'
                                render={attrs => (
                                    <div className={cx('user-menu')} tabIndex="-1" {...attrs}>
                                        <Popper>
                                            <button className={cx('change-password')}>
                                                <PopperItem title='Đổi mật khẩu' icon={<FontAwesomeIcon icon={faKey} />} />
                                            </button>
                                            <br />
                                            <button className={cx('logout')} onClick={() => sessionStorage.clear()}>
                                                <PopperItem title="Đăng xuất" to={config.route.home} icon={<FontAwesomeIcon icon={faRightFromBracket} />}/>
                                            </button>
                                        </Popper>
                                    </div>
                                )}
                            >
                                <button className={cx('user-icon')} onClick={visible? hide:show}> 
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                            </Tippy>
    
                            <button className={cx('cart')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;