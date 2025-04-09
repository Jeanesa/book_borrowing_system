import DateTimeDisplay from "./DateTimeDisplay";

const Header = () =>{

    return(
        <header>
            <div>
                <p style={{fontSize: '20px', fontWeight: '400'}}>LIBRARY MANAGEMENT SYSTEM</p>
                <p style={{fontWeight: '300'}}><em>Book Borrowing</em></p>
            </div>
            <div>
                <p style={{fontSize: '15px'}}><DateTimeDisplay/></p>
            </div>
        </header>
    );
}

export default Header