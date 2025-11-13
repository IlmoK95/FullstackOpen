import { createContext, useReducer, useEffect } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SUCCES":
            return { content: action.content, isError: false }
        case "ERROR":
            return { content: action.content, isError: true }
        case "REMOVE":
            return { content: null, isError: false }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        { content: null, isError: false }
    )

    useEffect(() => {
        if (notification.content !== "") {
            console.log("timeout")
            setTimeout(() => {
                notificationDispatch({ type: "REMOVE" })
            }, 3000)
        }
    }, [notification.content])

    return (
        <NotificationContext.Provider
            value={{ notification, notificationDispatch }}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
