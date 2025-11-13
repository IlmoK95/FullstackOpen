import { useContext } from "react"
import NotificationContext from "../reducers/notificationReducer"
import { Alert } from "react-bootstrap"

const Notification = () => {
    const { notification } = useContext(NotificationContext)

    return (
        <div>
            {notification.content && (
                <Alert variant={notification.isError ? "danger" : "success"}>
                    {notification.content}
                </Alert>
            )}
        </div>
    )
}
export default Notification
