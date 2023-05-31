import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';
import config from '../../config';

import classNames from 'classnames/bind';
import styles from '../../css/Layout.module.scss';

const cx = classNames.bind(styles)

const AdminPage = () => {
    return (
        <div>
            <Header adLogined={true} userLogined={false} to={config.route.admin}/>
            <div className={cx('work-space')}>
                <ListBook adLogined={true} userLogined={false} />
            </div>
        </div>
    );
};

export default AdminPage;