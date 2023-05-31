import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';
import PopupModal from './PopupModal';
import Confirm from './Confirm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTableCells, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '../css/ListBook.module.scss'

const cx = classNames.bind(styles)

const ListBook = ({ adLogined, userLogined }) => {

    const role = sessionStorage.getItem("role")

    const[viewList, setViewList] = useState(role==='admin' ? true : false)
    const [viewTable, setViewTable] = useState(role==='admin' ? false : true)

    const toggleViewList = () => {
        setViewList(true)
        setViewTable(false)
    }

    const toggleViewTable = () => {
        setViewList(false)
        setViewTable(true)
    }

    const [books, setBooks] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setBooks(data)
            })
            .catch((err) => console.log(err))
    }, []);

    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        if (searchText === "") setBooks(data)
        else {
            
            setBooks(
                data.filter((book) => {
                    if (book.title.toLowerCase().includes(searchText.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchText.toLowerCase())){
                        return book
                    }
                    else return null;
                })
            )
        }
    }, [searchText]);
    const handleSearch = () => {
        fetch(`http://localhost:8080/books/search/${searchText}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }

    const [idBook, setIdBook] = useState();
    const deleteBook = () => {
        fetch(`http://localhost:8080/delete/${idBook}`)
            .then(window.location.reload())
            .catch(err => console.log(err))
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <h2>Tủ sách</h2>
            </div>

            <div className={cx('search')}>
                <input type="text" onChange={e => setSearchText(e.target.value)}
                    className="form-control" placeholder="Tìm Kiếm" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}
                    id="button-addon2"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>

            {
                adLogined &&
                <div className={cx('add-book')}>
                    <Link to={'/book/-1'}><button type="button" className="btn btn-primary">Thêm sách</button></Link>
                </div>
            }

            {
                adLogined &&
                <div className={cx('view-mode')}>
                    <button onClick={toggleViewTable}><FontAwesomeIcon icon={faTableCells} /></button>
                    <button onClick={toggleViewList}><FontAwesomeIcon icon={faList} /></button>
                </div>
            }

            {
                viewTable &&
                <div className={cx('list-book')}>
                    {
                        books.map((book) => {
                            return (
                                <BookItem key={book.id} clickDelete={() => {
                                    toggleModal()
                                    setIdBook(book.id)
                                }} book={book} adLogined={adLogined} userLogined={userLogined}/>
                            )
                        })
                    }
                </div>
            }

            {
                viewList && 
                <div className={cx('list-table-book')}>
                    <table className="table table striped table-bordered">
                        <thead>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th>Tác Giả</th>
                                <th>Thể Loại</th>
                                <th>Ngày Phát Hành</th>
                                <th>Số Trang</th>
                                <th>Đã Bán</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                books.map((book) => {
                                    return (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.category}</td>
                                            <td>{book.releaseDay}</td>  
                                            <td>{book.page}</td>  
                                            <td>{book.sold}</td>  
                                            <td>
                                                <Link to={`/book/${book.id}`}><button className="btn btn-primary">Xem</button></Link>
                                                <button onClick={() => {
                                                    toggleModal()
                                                    setIdBook(book.id)
                                                }} className="btn btn-danger">Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

            {
                modal &&
                <PopupModal content={<Confirm onClick={toggleModal} confirm={deleteBook} action="xóa" />} onClick={toggleModal}/>
            }
        </div>
    );
};

export default ListBook;