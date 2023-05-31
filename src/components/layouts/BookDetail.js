import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import PopupModal from '../PopupModal';
import Confirm from '../Confirm';
import Message from '../Message';
import config from '../../config';

import classNames from 'classnames/bind';
import styles from '../../css/BookDetail.module.scss';

const cx = classNames.bind(styles)

const BookDetail = () => {

    const role = sessionStorage.getItem("role");

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        }
    }
    
    const [book, setBook] = useState({});
    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data))
        .catch((err) => console.log(err))
    }, []);
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/book-categories")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.log(err))
    }, []);
    
    const [edit, setEdit] = useState(false)
    const toggleEdit = () => {
        setEdit(true)
    }

    const saveBook = () => {
        fetch(`http://localhost:8080/book/save/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .catch((err) => console.log(err))
        const data = new FormData();
        data.append('File', imageFile)
        fetch(`http://localhost:8080/book/upload/${id}`, {
            method: 'POST',
            body: data,
        })
            .then(navigate("/admin"))
            .catch((err) => console.log(err))
    }

    const [checkTitle, setCheckTitle] = useState(false);
    const [checkAuthor, setCheckAuthor] = useState(false);
    const [checkReleaseDay, setCheckReleaseDay] = useState(false);
    const [checkImage, setCheckImage] = useState(false);
    const [response, setResponse] = useState(false);

    const addBook = () => {
        !book.title ? setCheckTitle(true) : setCheckTitle(false);
        !book.author ? setCheckAuthor(true) : setCheckAuthor(false);
        !book.releaseDay ? setCheckReleaseDay(true) : setCheckReleaseDay(false);
        !imageFile ?  setCheckImage(true) : setCheckImage(false);

        if (book.title && book.author && book.releaseDay && imageFile){

            fetch(`http://localhost:8080/book/add/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })  
                .then(res => res.json())
                .then(data => {
                    if (data.message==="Sách đã tồn tại!"){
                        setResponse(true)
                    }
                })
                .catch((err) => console.log(err))
            
            if(response===false){
                const data = new FormData();
                data.append('File', imageFile)
                setTimeout(() => {
                    fetch(`http://localhost:8080/book/upload/${id}`, {
                        method: 'POST',
                        body: data,
                    })
                        .then(navigate("/admin"))
                        .catch((err) => console.log(err))
                }, 2000)
            }
        }
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleMessage = () => {
        setResponse(false)
    }

    return (
        <div>
            <Header  adLogined={role==='admin' ? true : false} userLogined={role==='admin' ? false : true} 
                    to={role==='admin' ? config.route.admin : config.route.user}/>
            <div className={cx('title')}>
                <h2>{id < 0? "Sách mới" : "Chi Tiết Sách"}</h2>
            </div>
            <div className={cx('container')}>
                <div className={cx('book-info')}>
                    <div className={cx('input')}>
                        <div className={cx('row-input')}>
                            <div>
                                Tiêu Đề<span>*</span>
                                    <input disabled={!edit && id>0} type="text" defaultValue={book.title}
                                        onChange={e => setBook({ ...book, title: e.target.value })}
                                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    {checkTitle && <p className={cx('validate')}>Tiêu đề không được để trống!</p>}
                            </div>
                            <div>
                                Tác Giả<span>*</span>
                                    <input disabled={!edit && id>0} type="text" defaultValue={book.author}
                                        onChange={e => setBook({ ...book, author: e.target.value })}
                                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    {checkAuthor && <p className={cx('validate')}>Tác giả không được để trống!</p>}
                            </div>
                        </div>
                        <br/>
                        Mô Tả Về Sách
                            <textarea disabled={!edit && id>0} type="text" defaultValue={book.description}
                                onChange={e => setBook({ ...book, description: e.target.value })} 
                                rows="4" cols="50"
                                className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <br/>
                        <div className={cx('row-input')}>
                           <div>
                                Ngày Phát Hành<span>*</span>
                                    <input disabled={!edit && id>0} type="date" defaultValue={book.releaseDay}
                                        onChange={e => setBook({ ...book, releaseDay: e.target.value })}
                                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    {checkReleaseDay && <p className={cx('validate')}>Ngày phát hành không được để trống!</p>}
                           </div>
                            <div>
                                Số Trang
                                    <input disabled={!edit && id>0} type="number" defaultValue={book.page}
                                        onChange={e => setBook({ ...book, page: e.target.value })}
                                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            </div>
                        </div>
                        <br/>
                        <div className={cx('row-input')}>
                            <div>
                                Thể Loại
                                    <select disabled={!edit && id>0} value={book.category || setBook({ ...book, category: "Tiểu Thuyết" })}
                                        onChange={e => setBook({ ...book, category: e.target.value})}
                                        className="form-select" aria-label="Default select example">
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.categoryDesc}>{category.categoryDesc}</option>
                                                )
                                            })
                                        }
                                    </select><br />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('book-image')}>
                    Ảnh bìa
                    <div className={cx('image')}>
                        <div className="input-group mb-3">
                            <input disabled={!edit && id>0} type="file" onChange={onImageChange} className="form-control" id="inputGroupFile02" />
                        </div>
                        {   
                            id > 0 ?
                            <img src={image? image : require(`../../../public/images/${id}.png`)} alt='book-cover'/> :
                            image &&
                            <img src={image} alt='book-cover'/>
                        }
                        {checkImage && <p className={cx('validate')}>Bìa sách không được để trống!</p>}
                    </div>
                </div>
            </div>

            <div className={cx('action')}>
                {
                    !edit && id > 0 &&
                    <button onClick={toggleEdit} type="button" className="btn btn-outline-info">Chỉnh Sửa</button>
                }
                {
                    edit &&
                    <button onClick={saveBook} type="button" className="btn btn-outline-success">Lưu</button>
                }
                {
                    id < 0 && 
                    <button onClick={toggleModal} type="button" className="btn btn-outline-primary">Thêm</button> 
                }
            </div>

            {
                modal &&
                <PopupModal content={<Confirm onClick={toggleModal} confirm={addBook} action='thêm sách' />} onClick={toggleModal} />
            }
            {
                response &&
                <PopupModal content={<Message message="Sách đã tồn tại!" onClick={toggleMessage} />} onClick={toggleMessage} />
            }
        </div>
    );
};

export default BookDetail;