import { useSelector, useDispatch } from 'react-redux'
import { appendVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList =()=>{

   
    const dispatch = useDispatch()


    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })



    const vote = id => {
        
        const anecdote = anecdotes.filter(anecdote => anecdote.id === id)
        dispatch(appendVote(anecdote[0]))
        dispatch(setNotification(`New vote for "${anecdote[0].content}"`, 1))

    }


    return (
        <div>
            
            {anecdotes.map(anecdote => (
             <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
      ))}

        </div>
    )
}
export default AnecdoteList