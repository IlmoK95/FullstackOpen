import { useContext } from "react"
import NotificationContext from "../components/NotificationContext"


const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (content) => {
  if(content.length < 5){
    throw new Error('Anecdote must be at least 5 characters long')
    
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content, votes: 0, id: getId()})
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create ancedote')
  }
 
  return await response.json()
}

export const addVote = async (content) => {
  const PUTurl = baseUrl+'/'+content.id
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...content, votes: content.votes+1})
  }
  const response = await fetch(PUTurl, options)
  console.log(response)

    if (!response.ok) {
    throw new Error('Failed to vote note')
  }
  
  return await response.json()
}
