import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonSelection from "./ButtonSelection";
import Footer from "./Footer";
import Header from "./Header";
import Board from "./Board";
import LibrarianPage from "./LibrarianPage";
import StudentPage from "./StudentPage";
import FacultyPage from "./FacultyPage";

const App = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [books, setBooks] = useState([]);
	const [borrowedBooks, setBorrowedBooks] = useState([]);

	useEffect(() => {
		const savedAnnouncements =
		JSON.parse(localStorage.getItem("announcements")) || [];
		setAnnouncements(savedAnnouncements);
	}, []);

	useEffect(() => {
		localStorage.setItem("announcements", JSON.stringify(announcements));
	}, [announcements]);

	useEffect(() => {
		const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
		setBooks(savedBooks);

		const savedBorrowedBooks =
			JSON.parse(localStorage.getItem("borrowedBooks")) || [];
		setBorrowedBooks(savedBorrowedBooks);
	}, []);

	useEffect(() => {
		localStorage.setItem("books", JSON.stringify(books));
	}, [books]);

	useEffect(() => {
		localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
	}, [borrowedBooks]);

	return (
		<div className="app-container">
			<div className="header-container">
				<Header/>
			</div>
			<main className="main-content">
				<Routes>
					<Route path="/" element={
						<div className="role-selection">
							<div className="roles">
								<p style={{textAlign: "center", fontSize: "20px", lineHeight: "1.5",}}>
									Welcome to the <strong>Library Management System!</strong>
									<br /> Please select your <strong>role</strong> to continue.
								</p>
								<ButtonSelection />
								<p style={{ lineHeight: "1.5", paddingLeft: "70px" }}>
									<em style={{ fontSize: "25px", color: "grey" }}>
									A reader lives a thousand lives before he dies.
									</em>
									<br />
									<strong>George R.R. Martin from A Dance with Dragons.</strong>
								</p>
							</div>
							<div className="announcement-board">
								<Board announcements={announcements}/>
							</div>
						</div>
					}/>
					<Route path="/librarian" element={<LibrarianPage announcements={announcements} setAnnouncements={setAnnouncements} books={books} setBooks={setBooks} borrowedBooks={borrowedBooks}/>}/>
					<Route path="/student" element={<StudentPage books={books} setBooks={setBooks} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks}/>}/>
					<Route path="/faculty" element={<FacultyPage books={books} setBooks={setBooks} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks}/>}/>
				</Routes>
			</main>
			<div className="footer-container">
				<Footer/>
			</div>
		</div>
	);
};

export default App;
