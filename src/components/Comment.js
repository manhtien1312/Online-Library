import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/Comment.module.scss';

const cx = classNames.bind(styles)

const Comment = ({ idBook }) => {

    const[allComments, setAllComments] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/book/${idBook}/all-comments`)
            .then(res => res.json())
            .then(data => setAllComments(data))
            .catch(err => console.log(err))
    }, [])

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

    const[text, setText] = useState('');
    const buttonDisabled = text.length === 0;
    const submitComment = () => {
        setText('')

        const requestBody = {
            id: 0,
            idBook: idBook,
            idUser: sessionStorage.getItem("id"),
            userName: sessionStorage.getItem("user"),
            content: text,
            time: new Date(),
        }

        setAllComments([ requestBody, ...allComments ])

        fetch('http://localhost:8080/book/add-comment', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .catch((err) => console.log(err))
    }

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                <h4>Bình luận</h4>
                <p>{allComments.length} bình luận</p>
            </div>

            <div className={cx('comment-form')}>
                <form onSubmit={submitComment}>
                    <textarea 
                        value={text} 
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => {if(e.key === 'Enter') {
                            e.preventDefault()
                            submitComment()
                        }}}
                        rows="4" cols="50"
                        className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </form>
                <button
                    onClick={submitComment} 
                    disabled={buttonDisabled}
                    className="btn btn-primary"
                >Bình luận</button>
            </div>

            <div className={cx('list-comments')}>
                {
                    allComments.map((comment) => {
                        return (
                            <div className={cx('comment')} key={comment.id}>
                                <div className={cx('comment-image')}>
                                    <img src="/usericon.png" alt='user-icon'/>
                                </div>
                                <div className={cx('comment-content')}>
                                    <div className={cx('comment-author')}>{comment.userName}
                                        <span>{formatDate(comment.time)}</span>
                                    </div>
                                    <div className={cx('comment-text')}>
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Comment;