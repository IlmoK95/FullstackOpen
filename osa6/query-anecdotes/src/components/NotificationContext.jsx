import { createContext, useReducer } from 'react'

const notificationReducer =(state, action)=>{

    switch (action.type){
        
        case 'NEW':
            return `You added new anecdote: ${action.content}.`
        case 'VOTE':
            return `You voted anecdote: ${action.content}.`
        case 'ERROR':
            return action.error
        case 'REMOVE':
            return ''

        
    }
}




const NotificationContext = createContext()

export const NotificationContextProvider =(props)=>{
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext