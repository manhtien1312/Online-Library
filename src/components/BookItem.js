import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../css/BookItem.module.scss'

const cx = classNames.bind(styles)

const BookItem = ({ book, clickDelete, adLogined, userLogined }) => {

    return (
        <div className={cx('container')}>
                <div className={cx('card')}>
                    <Link to={`/book/${book.id}`}>
                        <img src={require(`../../public/images/${book.id}.png`)} alt="bìa sách" />
                        <p className={cx('title')}>{book.title}</p>
                        <p className={cx('author')}>{book.author}</p>
                    </Link>
    
                    {
                        adLogined &&
                        <div className={cx('action')}>
                            <Link to={`/book/${book.id}`}><button type="button" id='btn-admin' className='btn btn-info'>Xem</button></Link>
                            <button onClick={clickDelete} type="button" className='btn btn-danger'>Xóa</button>
                        </div>
                    }
    
                    {
                        userLogined&&
                        <div className={cx('action')}>
                            <Link to={`/book/${book.id}`}><button type="button" className="btn btn-secondary">Mua</button></Link>
                        </div>
                    }
                </div>
        </div>
    );
};

export default BookItem;