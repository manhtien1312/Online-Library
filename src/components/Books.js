
import React, { useState, useEffect } from "react";

function Books(props) {

    const [books, setBooks] = useState([]);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() =>{
        setBooks(data)
        books.filter((book) =>{
            if (book.title.includes(searchText) || book.author.includes(searchText)) return book;
        });   
        if (searchText === "") setBooks(data)
    },[searchText]);


    return ( 
        <div>
            <h2 className="text-center">Books List</h2>
            <div className="row">
                <button className="btn btn-primary">Add book</button>
            </div>

            <input placeholder="search" onChange={e => setSearchText(e.target.value)} />

            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th disabled>Sold</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            books.map((book) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>
                                            <input type="checkbox" defaultChecked={book.sold} />    
                                        </td>
                                        <td>
                                            <button className="btn btn-primary">View</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;