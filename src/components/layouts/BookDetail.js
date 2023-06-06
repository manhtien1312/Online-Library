import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import Header from '../Header';
import PopupModal from '../PopupModal';
import Confirm from '../Confirm';
import Message from '../Message';
import Comment from '../Comment';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '../../css/BookDetail.module.scss';

const cx = classNames.bind(styles)

const BookDetail = () => {

    const role = sessionStorage.getItem("role");
    const idUser = sessionStorage.getItem("id");

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    
    const [image, setImage] = useState("");
    const onImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result)
            setBook({ ...book, bookCover: reader.result })
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

    const [checkTitle, setCheckTitle] = useState(false);
    const [checkAuthor, setCheckAuthor] = useState(false);
    const [checkReleaseDay, setCheckReleaseDay] = useState(false);
    const [checkPrice, setCheckPrice] = useState();
    const [addResponse, setAddResponse] = useState(false);

    const validate = () => {
        !book.title ? setCheckTitle(true) : setCheckTitle(false);
        !book.author ? setCheckAuthor(true) : setCheckAuthor(false);
        !book.releaseDay ? setCheckReleaseDay(true) : setCheckReleaseDay(false);
        book.price==0 || !!book.price==false ? setCheckPrice(true) : setCheckPrice(false);
    }

    const saveBook = () => {
        validate();

        if (book.title && book.author && book.releaseDay && !!book.price!==false){
            if(book.price != 0){
                fetch(`http://localhost:8080/book/save/${id}`, {
                    method: "PUT",
                    mode: "cors",
                    body: JSON.stringify(book),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                })
                    .then(navigate("/admin"))
                    .catch((err) => console.log(err))
            }
        }
    }

    const addBook = () => {
        validate();

        if (book.title && book.author && book.releaseDay && book.price!=0){

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
                        setAddResponse(true)
                    } else {
                        navigate("/admin")
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleMessage = () => {
        setAddResponse(false)
    }
    const toggleOrderMessage = () => {
        setOrderResponse(false)
    }

    const [buyQuantity, setBuyQuantity] = useState(1);
    const [orderResponse, setOrderResponse] = useState(false);
    const orderBook = () => {
        const requestBody = {
            idOrder: 0,
            idBook: id,
            idUser: idUser,
            bookTitle: book.title,
            bookCover: book.bookCover,
            quantity: buyQuantity,
            time: new Date(),
            total: buyQuantity * book.price,
            payment: "Chưa thanh toán",
        }

        fetch('http://localhost:8080/order', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })  
            .then(res => res.json())
            .then(data => {
                if(data.message==='Thêm đơn thành công!'){
                    setOrderResponse(true)
                }
            })
            .catch(err => console.log(err))
    }

    const [allRating, setAllRating] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}/all-rating`)
        .then(res => res.json())
        .then(data => setAllRating(data))
        .catch(err => console.log(err))
    }, [])

    const [stars, setStars] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}/${idUser}/rating`)
            .then(res => res.json())
            .then(data => {
                setStars(data.stars)
            })
            .catch(err => console.log(err))
    }, [])

    const handleRating = (rate) => {
        
        const requestBody = {
            idBook: id,
            idUser: idUser,
            stars: rate,
        }

        fetch('http://localhost:8080/book/rating', {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })  
                .catch(err => console.log(err))

    }

    return (
        <div>
            <div className={cx('title')}>
                {role==='admin' ? <h2>{id < 0? "Sách mới" : "Chi Tiết Sách"}</h2> :
                                    <h2>{book.title}</h2>} 
            </div>

            {   role==="user" &&
                <div className={cx('rating-star')}>
                    <Rating
                        size={25}
                        initialValue={allRating.reduce((total, rating) => total + rating.stars, 0) / allRating.length}
                        allowFraction
                        readonly
                    />
                    <p className={cx('total-rating')}>{allRating.length} đánh giá</p>
                    <p>Đã bán: {book.sold}</p>
                </div>
            }

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
                            <div>
                                Giá<span>*</span>
                                    <input disabled={!edit && id>0} type="number" defaultValue={book.price}
                                        onChange={e => setBook({ ...book, price: e.target.value })}
                                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    {checkPrice && <p className={cx('validate')}>Giá sách không được để trống!</p>}
                            </div>
                        </div>
                        <br/>
                    {   role==='user' &&
                        <div className={cx('buy')}>
                            Số Lượng
                            <div className={cx('quantity')}>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setBuyQuantity(buyQuantity-1)
                                    }}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input type='number' min={1} value={buyQuantity} onChange={e => setBuyQuantity(e.target.value)} />
                                <button onClick={(e) => {
                                        e.preventDefault()
                                        setBuyQuantity(buyQuantity+1)
                                    }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <div className={cx('buy-button')}>
                                <button 
                                    className='btn btn-danger'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        orderBook()
                                    }}
                                >Đặt Mua</button>
                            </div>
                        </div>
                    }
                    </div>
                </div>  

                <div className={cx('book-image')}>
                    Ảnh bìa
                    <div className={cx('image')}>
                        <div className="input-group mb-3">
                        {   role==='admin' &&
                            <input disabled={!edit && id>0} type="file" onChange={onImageChange} className="form-control" id="inputGroupFile02" />
                        }
                        </div>
                        {   
                            id > 0 ?
                            <img src={book.bookCover} alt='book-cover'/> :
                            <img src={image!=="" ? image : ""} alt='book-cover'/>
                        }
                    </div>
                </div>
            </div>

            {   
                role==='admin' &&
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
            }

            {
                role==='user' && 
                <div className={cx('comment')}>
                    <div className={cx('user-rating')}>
                    <p>Đánh giá của bạn</p> <span>
                        <Rating
                            size={20}
                            initialValue={stars}
                            onClick={handleRating}
                        /></span>
                    </div>
                    <Comment 
                        idBook={id}
                    />
                </div>
            }

            <Header  adLogined={role==='admin' ? true : false} userLogined={role==='admin' ? false : true} 
                    to={role==='admin' ? config.route.admin : config.route.user}/>

            {
                modal &&
                <PopupModal content={<Confirm onClick={toggleModal} confirm={addBook} action='Bạn muốn thêm sách?' />} onClick={toggleModal} />
            }
            {
                addResponse &&
                <PopupModal content={<Message message="Sách đã tồn tại!" onClick={toggleMessage} />} onClick={toggleMessage} />
            }
            {
                orderResponse &&
                <PopupModal content={<Confirm onClick={() => {
                                                toggleOrderMessage()
                                            }} confirm={() => {
                                                toggleOrderMessage()
                                                navigate('/ordered')
                                            }} action='Đặt mua thành công!' />} onClick={toggleOrderMessage} />
            }
        </div>
    );
};

export default BookDetail;