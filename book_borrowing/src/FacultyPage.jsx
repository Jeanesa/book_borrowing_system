import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FacultyPage = ({ books, setBooks, borrowedBooks, setBorrowedBooks }) => {
    const navigate = useNavigate();
    const [facultyBorrowedBooks, setFacultyBorrowedBooks] = useState([]);

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
        setBooks(savedBooks);

        const savedFacultyBorrowedBooks = JSON.parse(localStorage.getItem("facultyBorrowedBooks")) || [];
        setFacultyBorrowedBooks(savedFacultyBorrowedBooks);
    }, []);

    useEffect(() => {
        if (facultyBorrowedBooks.length > 0) {
            localStorage.setItem("facultyBorrowedBooks", JSON.stringify(facultyBorrowedBooks));
        }
    }, [facultyBorrowedBooks]);

    const borrowBook = (bookId) => {
        if (facultyBorrowedBooks.length >= 10) {
            alert("Faculty members can only borrow up to 10 books. Return a book to borrow another.");
            return;
        }

        const bookToBorrow = books.find((book) => book.id === bookId);
        if (bookToBorrow && bookToBorrow.available) {
            const currentDateTime = new Date().toLocaleString();

            const updatedBooks = books.map((book) =>
                book.id === bookId ? { ...book, available: false } : book
            );
            setBooks(updatedBooks);
            localStorage.setItem("books", JSON.stringify(updatedBooks));

            const newBorrowedBook = {
                ...bookToBorrow,
                available: false,
                dateBorrowed: currentDateTime,
            };

            const updatedFacultyBorrowedBooks = [...facultyBorrowedBooks, newBorrowedBook];
            setFacultyBorrowedBooks(updatedFacultyBorrowedBooks);
            localStorage.setItem("facultyBorrowedBooks", JSON.stringify(updatedFacultyBorrowedBooks));

            const globalBorrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
            const updatedGlobalBorrowedBooks = [...globalBorrowedBooks, { ...newBorrowedBook, userType: "Faculty" }];
            localStorage.setItem("borrowedBooks", JSON.stringify(updatedGlobalBorrowedBooks));
        }
    };

    const returnBook = (bookId) => {
        const currentDateTime = new Date().toLocaleString();

        const updatedFacultyBorrowedBooks = facultyBorrowedBooks.filter((book) => book.id !== bookId);
        setFacultyBorrowedBooks(updatedFacultyBorrowedBooks);
        localStorage.setItem("facultyBorrowedBooks", JSON.stringify(updatedFacultyBorrowedBooks));

        const updatedBooks = books.map((book) =>
            book.id === bookId ? { ...book, available: true } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));

        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
        borrowedBooks = borrowedBooks.map((book) =>
            book.id === bookId ? { ...book, dateReturned: currentDateTime } : book
        );
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
        setBorrowedBooks(borrowedBooks);
    };

    return (
        <div className="faculty-page">
            <div className="back-container"> 
                <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <FaArrowLeftLong className="back-icon"/>
                </div>
            </div>
            <div>
                <h2>Faculty Dashboard</h2>
                <h3>Available Books</h3>
                <table className="faculty-available-books">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.available ? "Available" : "Borrowed"}</td>
                                    <td>
                                        {book.available && (
                                            <button className="borrow-button" onClick={() => borrowBook(book.id)}>Borrow</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No books available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h3>My Borrowed Books</h3>
                <table className="faculty-borrowed-books">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date Borrowed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyBorrowedBooks.length > 0 ? (
                            facultyBorrowedBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.dateBorrowed || "Unknown"}</td>
                                    <td>
                                        <button className="return-button" onClick={() => returnBook(book.id)}>Return</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No borrowed books</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyPage;
