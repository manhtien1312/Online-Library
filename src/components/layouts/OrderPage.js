import React from 'react';
import Header from '../Header';
import ListOrderedBook from '../ListOrderedBook';
import config from '../../config';

import classNames from 'classnames/bind';
import styles from '../../css/Layout.module.scss';

const cx = classNames.bind(styles);

const OrderPage = () => {
    return (
        <div>
            <Header adLogined={false} userLogined={true} to={config.route.user}/>
            <div className={cx('work-space')}>
                <ListOrderedBook />
            </div>
        </div>
    );
};

export default OrderPage;