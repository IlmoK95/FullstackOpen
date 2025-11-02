import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        newNotification(state, action){
            return action.payload
        },deleteNotification(state, action){
            return ''
        }
    }

})

const {newNotification, deleteNotification} = notificationSlice.actions

const removeNotification=(seconds)=>{
    console.log(seconds * 1000)
    return async (dispatch)=>{
        setTimeout(()=>{
            dispatch(deleteNotification())}
            ,seconds * 1000)
    }
}


export const setNotification=(message, seconds)=>{
    return async (dispatch)=>{
      
        dispatch(newNotification(message))
        dispatch(removeNotification(seconds))
        
        
    }
}

export default notificationSlice.reducer
