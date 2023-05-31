import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Books(props) {

    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
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

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/delete/${id}`)
            .then(
                setBooks(books.filter((book) => {
                    return book.id !== id
                }))
            )
    }

    const handleSearch = () => {
        fetch(`http://localhost:8080/books/search/${searchText}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }

    return ( 
        <div>

            <h2 className="text-center">Books List</h2>
            <div className="row">
                <Link to={"/book/-1"}><button className="btn btn-primary">Add book</button></Link>
            </div>

            <div>
                <input required placeholder="Seach" onChange={e => setSearchText(e.target.value)}/>
                <span><button type="submit" onClick={handleSearch} >Search</button></span>
            </div>
           

            <div className="row">
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
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>
                                        <input type="checkbox" defaultChecked={book.sold} />
                                    </td>
                                    <td>
                                        <Link to={`/book/${book.id}`}><button className="btn btn-primary">View</button></Link>
                                        <button onClick={() => handleDelete(book.id)} className="btn btn-danger">Delete</button>
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