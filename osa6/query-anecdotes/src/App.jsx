import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, addVote } from './services/anecdotes'
import { useContext } from "react"
import NotificationContext from "./components/NotificationContext"


const App = () => {

  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newVoteMutation = useMutation({
      mutationFn: addVote,
      onSuccess: (variables)=> {
        notificationDispatch({type: 'VOTE', content: variables.content})
        queryClient.invalidateQueries({queryKey: ['anecdotes']})
      },
      onError: (error)=>{
        notificationDispatch({type:'ERROR', error : error.message})

      },
      onSettled: ()=>{
        setTimeout(()=>{
          notificationDispatch({type: 'REMOVE'})
        },5000)
      }
    })

  const result = useQuery({

    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false

  })

  if (result.isLoading){
    return <div>WAITIIING......</div>
  }

  if (result.isError){
    return <div>Anecdote service not available due to problems in server</div>
  }

    const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote)
    
    //setTimeout(()=>{notificationDispatch({type: 'REMOVE'})}, 5000)
    
  }



  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
