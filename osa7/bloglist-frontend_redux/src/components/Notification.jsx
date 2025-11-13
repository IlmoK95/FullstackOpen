import { useSelector } from "react-redux"

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    const messageStyle = { color: notification.isError ? "red" : "green" }

    return (
        <div>
            <h3 style={messageStyle}>{notification.content}</h3>
        </div>
    )
}
export default Notification
