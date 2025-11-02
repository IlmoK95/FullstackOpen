import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"



const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (variables)=> {
      notificationDispatch({type:'NEW', content : variables.content})
      queryClient.invalidateQueries({queryKey: ['anecdotes']})},
    onError: (error)=>{
        notificationDispatch({type:'ERROR', error : error.message})

      },
    onSettled: ()=>{
      setTimeout(()=>{
        notificationDispatch({type: 'REMOVE'})
      },5000)
    }
  })


  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
