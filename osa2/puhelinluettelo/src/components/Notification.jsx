const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    
    const notificationStyle = {
        color: "green",
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        fontSize: "20px"
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification