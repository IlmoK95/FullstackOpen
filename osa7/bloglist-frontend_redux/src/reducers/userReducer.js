import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { newNotification } from "./notificationReducer"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

const { setUser } = userSlice.actions

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            )

            blogService.setToken(user.token)

            dispatch(setUser(user))
        } catch {
            dispatch(
                newNotification({ content: "cannot log in", isError: true })
            )
        }
    }
}

export const logOut = () => {
    return (dispatch) => {
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch(setUser(null))
    }
}

export const isLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    return (dispatch) => {
        if (!loggedUserJSON) {
            return
        }
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export default userSlice.reducer
