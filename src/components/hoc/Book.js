import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Book(props) {

    const params = useParams();
    const [book, setBook] = useState({});
    const id = params.id;
    const navigate = useNavigate('')

    const handleClick = () => {

        if(id >= 0){
            fetch(`http://localhost:8080/book/save/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .then(navigate("/books"))
                .catch((err) => console.log(err))

        } else {
            fetch(`http://localhost:8080/book/add/${id}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .then(navigate("/books"))
                .catch((err) => console.log(err))
        
        }
        
    }

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((res) => res.json())
            .then((data) => setBook(data))
            .catch((err) => console.log(err))
    }, [])

    return ( 
        <div>
            
            <h1>{id < 0 ? "New Book" : `Book ${id}`}</h1>
            Title:{" "}
            <input type="text" defaultValue={book.title}
                onChange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Author:{" "}
            <input type="text" defaultValue={book.author}
                onChange={e => setBook({ ...book, author: e.target.value })} />
            <br />
            Category:{" "}
            <input type="text" defaultValue={book.category}
                onChange={e => setBook({ ...book, category: e.target.value })} />
            <br />
            Sold:{" "}
            <input type="checkbox" checked={book.sold || false}
                onChange={e => setBook({ ...book, sold: e.target.checked })} />
            <br />

            <button onClick={handleClick}>Save Book</button>


        </div>
    );
}

export default Book;