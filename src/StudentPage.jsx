import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const StudentPage = ({ books, setBooks, borrowedBooks, setBorrowedBooks }) => {
    const navigate = useNavigate();
    const [studentBorrowedBooks, setStudentBorrowedBooks] = useState([]);
    const [isBorrowingAllowed, setIsBorrowingAllowed] = useState(false);

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
        setBooks(savedBooks);

        const savedStudentBorrowedBooks = JSON.parse(localStorage.getItem("studentBorrowedBooks")) || [];
        setStudentBorrowedBooks(savedStudentBorrowedBooks);

        checkBorrowingTime();
    }, []);

    useEffect(() => {
        if (studentBorrowedBooks.length > 0) {
            localStorage.setItem("studentBorrowedBooks", JSON.stringify(studentBorrowedBooks));
        }
    }, [studentBorrowedBooks]);

    const checkBorrowingTime = () => {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 7 && hours < 17) {
            setIsBorrowingAllowed(true);
            // setIsBorrowingAllowed(false);            // uncomment if not 8:00 AM to 5:00 PM
        } else {
            setIsBorrowingAllowed(false);
            // setIsBorrowingAllowed(true);             // uncomment if not 8:00 AM to 5:00 PM
        }
    };

    const borrowBook = (bookId) => {
        if (!isBorrowingAllowed) {
            alert("Borrowing is only allowed between 7:00 AM and 5:00 PM.");
            return;
        }
        if (studentBorrowedBooks.length >= 3) {
            alert("You can only borrow up to 3 books. Return a book to borrow another.");
            return;
        }

        const bookToBorrow = books.find((book) => book.id === bookId);
        if (bookToBorrow && bookToBorrow.available) {
            const currentDateTime = new Date().toLocaleString(); // Capture date & time

            const updatedBooks = books.map((book) =>
                book.id === bookId ? { ...book, available: false } : book
            );
            setBooks(updatedBooks);
            localStorage.setItem("books", JSON.stringify(updatedBooks));

            const newBorrowedBook = {
                ...bookToBorrow,
                available: false,
                dateBorrowed: currentDateTime, // Store date & time
            };

            const updatedStudentBorrowedBooks = [...studentBorrowedBooks, newBorrowedBook];
            setStudentBorrowedBooks(updatedStudentBorrowedBooks);
            localStorage.setItem("studentBorrowedBooks", JSON.stringify(updatedStudentBorrowedBooks));

            // Update Global Borrowed Books for Librarian
            const globalBorrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
            const updatedGlobalBorrowedBooks = [...globalBorrowedBooks, { ...newBorrowedBook, userType: "Student" }];
            localStorage.setItem("borrowedBooks", JSON.stringify(updatedGlobalBorrowedBooks));
        }
    };

    const returnBook = (bookId) => {
        const currentDateTime = new Date().toLocaleString(); // Capture return date & time

        // Update student's borrowed books list
        const updatedStudentBorrowedBooks = studentBorrowedBooks.filter((book) => book.id !== bookId);
        setStudentBorrowedBooks(updatedStudentBorrowedBooks);
        localStorage.setItem("studentBorrowedBooks", JSON.stringify(updatedStudentBorrowedBooks));

        // Update book status in the main book list
        const updatedBooks = books.map((book) =>
            book.id === bookId ? { ...book, available: true } : book
        );
        setBooks(updatedBooks);
        localStorage.setItem("books", JSON.stringify(updatedBooks));

        // Update the global borrowed books list (for librarian)
        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
        borrowedBooks = borrowedBooks.map((book) => 
            book.id === bookId ? { ...book, dateReturned: currentDateTime } : book
        );
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
        setBorrowedBooks(borrowedBooks);
    };

    return (
        <div className="student-page">
            <div className="back-container"> 
                <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <FaArrowLeftLong className="back-icon"/>
                </div>
            </div>
            <div>
                <h2>Student Dashboard</h2>
                    
                {!isBorrowingAllowed && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        Borrowing is only allowed between 7:00 AM and 5:00 PM.
                    </p>
                )}

                <h3>Available Books</h3>
                <table className="available-books-table">
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
                                    <button className="borrow-button" onClick={() => borrowBook(book.id)} disabled={!isBorrowingAllowed}>
                                        Borrow
                                    </button>
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
                <table className="borrowed-books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date Borrowed</th> {/* New Column */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentBorrowedBooks.length > 0 ? (
                            studentBorrowedBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.dateBorrowed || "Unknown"}</td> {/* Show Date & Time */}
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

export default StudentPage;