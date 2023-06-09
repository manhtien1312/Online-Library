import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';

import classNames from 'classnames/bind';
import styles from '../../css/Layout.module.scss';

const cx = classNames.bind(styles)

const HomePage = () => {
    return (
        <div>
            <Header adLogined={false} userLogined={false}/>
            <div className={cx('work-space')}>
                <ListBook adLogined={false} userLogined={true} />
            </div>
        </div>
    );
};

export default HomePage;