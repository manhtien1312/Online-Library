import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';
import config from '../../config'

import classNames from 'classnames/bind';
import styles from '../../css/Layout.module.scss';

const cx = classNames.bind(styles)

const UserPage = () => {
    return (
        <div>
            <Header adLogined={false} userLogined={true} to={config.route.user}/>
            <div className={cx('work-space')}>
                <ListBook adLogined={false} userLogined={true} />
            </div>
        </div>
    );
};

export default UserPage;