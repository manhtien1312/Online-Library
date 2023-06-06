import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import config from '../../config';

import classNames from 'classnames/bind';
import styles from '../../css/OrderDetail.module.scss';

const cx = classNames.bind(styles);

const OrderDetail = () => {

    const role = sessionStorage.getItem("role");

    const params = useParams();
    const idOrder = params.id;

    const [order, setOrder] = useState({});
    useEffect(() => {
        fetch(`http://localhost:8080/ordered/${idOrder}`)
            .then((res) => res.json())
            .then((data) => setOrder(data))
            .catch((err) => console.log(err))
    }, []);
    
    const formatNum = (num) => {
        return num.toString().padStart(2, '0');
    }
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return [
            formatNum(date.getDate()),
            formatNum(date.getMonth() + 1),
            date.getFullYear(),
        ].join('-')
    }

    return (
        <div>
            <div className={cx('title')}>
                <h2>Chi Tiết Đơn Sách</h2>
            </div>

            <div className={cx('container')}>
                <div className={cx('book-image')}>
                    <div className={cx('image')}>
                        <img src={order.bookCover} alt='book-cover' />
                    </div>
                </div>

                <div className={cx('book-info')}>
                    Tên sách: {order.bookTitle}<br/>
                    Số Lượng: {order.quantity}<br />
                    Ngày Đặt: {formatDate(order.time)}<br/>
                    Tổng Thanh Toán: {order.total}<br />
                </div>
            </div>

            <Header  adLogined={role==='admin' ? true : false} userLogined={role==='admin' ? false : true} 
                    to={role==='admin' ? config.route.admin : config.route.user}/>
        </div>
    );
};

export default OrderDetail;