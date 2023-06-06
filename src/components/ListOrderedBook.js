import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopupModal from './PopupModal';
import Confirm from './Confirm';

import classNames from 'classnames/bind';
import styles from '../css/ListBook.module.scss'

const cx = classNames.bind(styles);

const ListOrderedBook = () => {

    const idUser = sessionStorage.getItem("id")
    const [orderedBooks, setOrderedBooks] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/ordered-list/${idUser}`)
            .then(res => res.json())
            .then(data => setOrderedBooks(data))
            .catch(err => console.log(err))
    }, []);

    const calculateTime = (time) => {
        const currentDate = new Date();
        const orderDate = new Date(time);
        let diff = Math.abs(currentDate.getTime() - orderDate.getTime()) / 3600000;
        if (diff <= 24) return false;
        else return true;
    }

    const [idOrder, setIdOrder] = useState();
    const cancelOrder = () => {
        fetch(`http://localhost:8080/delete-order/${idOrder}`)
            .then(window.location.reload())
            .catch(err => console.log(err))
    }

    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => {
        setConfirmModal(!confirmModal);
    }

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
        <div className={cx('container')}>
            <div className={cx('title')}>
                <h2>Sách Đã Đặt Mua</h2>
            </div>
            <div className={cx('list-table-book')}>
                <table className="table table striped table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tiêu Đề</th>
                            <th>Số Lượng</th>
                            <th>Ngày Đặt</th>
                            <th>Tình Trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderedBooks.map((orderedBook) => {
                                return (
                                        <tr key={orderedBook.idOrder}>
                                            <td className={cx('book-cover')}><img src={orderedBook.bookCover} alt='book-cover' /></td>
                                            <td>{orderedBook.bookTitle}</td>
                                            <td>{orderedBook.quantity}</td>
                                            <td>{formatDate(orderedBook.time)}</td>
                                            <td>{orderedBook.payment}</td>
                                            <td>
                                                <Link to={`/ordered/${orderedBook.idOrder}`}><button className='btn btn-info'>Xem Đơn</button></Link>
                                                <button className='btn btn-danger'
                                                    disabled={calculateTime(orderedBook.time)}    
                                                    onClick={() => {
                                                        toggleConfirmModal();
                                                        setIdOrder(orderedBook.idOrder);
                                                    }}
                                                >Hủy đơn</button>
                                            </td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {
                confirmModal &&
                <PopupModal content={<Confirm onClick={toggleConfirmModal} confirm={cancelOrder} action='Xác nhận hủy đơn?' />} onClick={toggleConfirmModal} />
            }
        </div>
    );
};

export default ListOrderedBook;