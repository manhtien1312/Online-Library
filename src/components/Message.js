import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '../css/Confirm.module.scss';

const cx = classNames.bind(styles)

const Message = ({ message, onClick }) => {
    return (
        <div className={cx('content')}>
            <button id={cx('exit')} onClick={onClick}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3>{message}</h3>
        </div>
    );
};

export default Message;