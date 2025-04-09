const Board = ({ announcements }) => {
    return (
        <div className="board-container">
            <div className="board-title">
                <p>Announcements</p>
            </div>
            <table className="notice-table">
                <thead>
                    <tr>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.length > 0 ? (
                        announcements.map((notice) => (
                            <tr key={notice.id}>
                                <td>{notice.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No announcements yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Board;
