import { createSlice } from "@reduxjs/toolkit"

const initialState = { content: "", isError: false }
let timer = 3000

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
    },
})

const { setNotification } = notificationSlice.actions

export const newNotification = (notification) => {
    return (dispatch) => {
        setTimeout(
            () => dispatch(setNotification({ content: "", isError: false })),
            timer
        )
        dispatch(setNotification(notification))
    }
}

export default notificationSlice.reducer
