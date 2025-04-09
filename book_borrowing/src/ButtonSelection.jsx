import { FaUserGraduate, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ButtonSelection = () => {
    const navigate = useNavigate(); // React Router Hook for navigation

    return (
        <div className="container">
            <div className="button-container">
                <div 
                    className="student-box"
                    onClick={() => navigate("/student")}
                    style={{ cursor: "pointer" }}>
                    <FaUserGraduate className="icon"/>
                    <p>Student</p>
                </div>
                <div className="faculty-box"
                    onClick={() => navigate("/faculty")}
                    style={{ cursor: "pointer" }}>
                    <FaChalkboardTeacher className="icon"/>
                    <p>Faculty</p>
                </div>
                <div 
                    className="librarian-box"
                    onClick={() => navigate("/librarian")} // Redirects to Librarian page
                    style={{ cursor: "pointer" }}>
                    <FaBook className="icon"/>
                    <p>Librarian</p>
                </div>
            </div>
        </div>
    );
}

export default ButtonSelection;
