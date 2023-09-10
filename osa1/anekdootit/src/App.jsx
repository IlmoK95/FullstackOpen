import { useState } from 'react'



const newIndex =(props)=> Math.floor(Math.random() * props.maxim)



const Button=(props)=>{
  return(
    <button onClick={props.action}>{props.text}</button>
  )
}

  

const App = () => {
  const anecdotes =  [
    {id : 0, anecdote : 'If it hurts, do it more often.', vote : 0},
    {id : 1, anecdote :'Adding manpower to a late software project makes it later!', vote : 0},
    {id : 2, anecdote :'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote : 0},
    {id : 3, anecdote : 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote : 0},
    {id : 4, anecdote : 'Premature optimization is the root of all evil.', vote: 0},
    {id : 5, anecdote :'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote : 0},
    {id : 6, anecdote :'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', vote : 0},
    {id : 7, anecdote :'The only way to go fast, is to go well.', vote : 0}
  ]

  const [selected, setSelected] = useState(0)
  const [properties, setProperties] = useState(anecdotes)
  const maxim = anecdotes.length

  function updateLikes() {

    const mappedList = properties.map(obj => {
      if (obj.id === selected){

        const newLike = obj.vote + 1
        return {...obj, vote : newLike}
      }
      return obj

    })

    setProperties(mappedList)


  }
    
    

  return (
    <div>
      {anecdotes[selected].anecdote}
      <Button action={()=>setSelected(newIndex({maxim}))} text='next anecdote'/>
      <Button action={()=>updateLikes()} text='vote'/>
      <p>has {properties[selected].vote} votes</p>
      
    </div>
  )
}

export default App