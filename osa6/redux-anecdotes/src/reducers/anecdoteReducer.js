import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"




const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
      addAnecdote(state, action){
      state.push(action.payload)
      
    },setAnecdotes(state, action){
      action.payload.sort((a, b)=> b.votes-a.votes )
      return action.payload
      
    }

  }
})

const { setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const initAnecdotes=()=>{
  return async (dispatch)=>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote=(content)=>{
  return async (dispatch)=>{
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const appendVote=(content)=>{
  return async (dispatch)=>{
    const updatedAnecdote = {...content, votes: content.votes + 1}
    anecdoteService.addVote(updatedAnecdote)
                   .then( () => dispatch(initAnecdotes()))
  }
}




export default  anecdoteSlice.reducer
export const {addVote} = anecdoteSlice.actions