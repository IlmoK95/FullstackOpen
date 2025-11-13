import { createContext, useReducer, useEffect } from "react"
import loginService from "../services/login"
import { setToken } from "../services/blogs"

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return action.credentials
        }
        case "LOGOUT": {
            const user = logout()
            return user
        }
        case "IS_LOGGED_IN": {
            const user = isLoggedIn()
            return user
        }
        default:
            return null
    }
}

const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    return null
}

const isLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (!loggedUserJSON) {
        return null
    }
    const user = JSON.parse(loggedUserJSON)
    setToken(user.token)
    return user
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    useEffect(() => {
        userDispatch({ type: "IS_LOGGED_IN" })
    }, [])

    return (
        <UserContext.Provider value={{ user, userDispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
