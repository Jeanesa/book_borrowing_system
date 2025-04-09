import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Board from "./Board";


const LibrarianPage = ({ announcements, setAnnouncements }) => {
    const navigate = useNavigate();
    console.log("LibrarianPage Rendered");
    console.log("Announcements:", announcements);

    const [newAnnouncement, setNewAnnouncement] = useState("");
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "" });
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
        setBooks(savedBooks);
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            localStorage.setItem("books", JSON.stringify(books));
        }
    }, [books]);
    
    useEffect(() => {
        const loadBorrowedBooks = () => {
            const savedBorrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
            setBorrowedBooks(savedBorrowedBooks);
        };

        loadBorrowedBooks();

        const handleStorageChange = (event) => {
            if (event.key === "borrowedBooks") {
                loadBorrowedBooks();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const addBook = () => {
        if (newBook.title.trim() && newBook.author.trim()) {
            const updatedBooks = [...books, { id: Date.now(), title: newBook.title, author: newBook.author, available: true }];
            setBooks(updatedBooks);
            setNewBook({ title: "", author: "" });
        }
    };

    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const addAnnouncement = () => {
        if (newAnnouncement.trim()) {
            const updatedAnnouncements = [...announcements, { id: Date.now(), message: newAnnouncement }];
            setAnnouncements(updatedAnnouncements);
            setNewAnnouncement("");
        }
    };

    const deleteAnnouncement = (id) => {
        const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
        setAnnouncements(updatedAnnouncements);
    };

    return (
        <div className="librarian-page">
            <div className="back-container"> 
                <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <FaArrowLeftLong className="back-icon"/>
                </div>
            </div>
            <div className="books-info">
                <h2>Librarian Dashboard</h2>
                <h3>All Books</h3>
                <table className="all-books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.available ? "Available" : "Borrowed"}</td>
                                <td>{book.available ? (
                                    <button className="delete-btn" onClick={() => deleteBook(book.id)}>Delete</button>
                                ) : (
                                    <button className="delete-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                                        Cannot Delete
                                    </button>
                                )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Add New Book</h3>
                <input 
                    type="text" 
                    placeholder="Book Title" 
                    value={newBook.title} 
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Author" 
                    value={newBook.author} 
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <button className="add-button" onClick={addBook}>Add Book</button>

                <h3>Borrowed Books</h3>
                <table className="all-borrowed-books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date Borrowed</th>
                            <th>User Type</th>
                            <th>Date Returned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedBooks.length > 0 ? (
                            borrowedBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.dateBorrowed}</td>
                                    <td>{book.userType}</td>
                                    <td>{book.dateReturned || "Not yet returned"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No borrowed books</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="notice-container">
                <div className="content">
                    <Board announcements={announcements} />
                    <h3>Add New Announcement</h3>
                    <input type="text" placeholder="New Announcement" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)}/>
                    <button className="notice-add-button" onClick={addAnnouncement}>Add</button>

                    <h3>Manage Announcements</h3>
                    <table className="notice-table">
                        <thead>
                            <tr>
                                <th>Announcement</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement) => (
                                <tr key={announcement.id}>
                                    <td>{announcement.message}</td>
                                    <td className="notice-action">
                                        <button className="notice-remove-button" onClick={() => deleteAnnouncement(announcement.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LibrarianPage;
