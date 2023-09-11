import { useState } from 'react'



const newIndex =(props)=> Math.floor(Math.random() * props.maxim)


const HeaderDisplay=(props)=>{
  return (
    <h1>{props.header}</h1>
  )

}


const Button=(props)=>{
  return(
    <button onClick={props.action}>{props.text}</button>
  )
}


const Display =(props)=>{
  return(
    <p>{props.text}</p>
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
  const [mostPopular, setMostPopular] = useState([anecdotes[0]])
  const maxim = anecdotes.length

  function updateLikes() {

    const mappedList = properties.map(obj => {
      if (obj.id === selected){

        const newVote = obj.vote + 1
        return {...obj, vote : newVote}
      }
      return obj

    })

    setProperties(mappedList)
    {/*after the likes are updated, most popular anecdote is re-checked*/}
    GetMostPopular(mappedList)

  }

  function GetMostPopular(mappedList) {

    const newMostPopular = []
    const copyList = [...mappedList]
    const sortedList = copyList.sort((a,b)=> (a.vote > b.vote) ? -1 : 1)
    newMostPopular.push(sortedList[0])

    setMostPopular(newMostPopular)
   
  }
    
  return (
    <div>
      <HeaderDisplay header = 'Anecdote of the day'/>
      <Display text= {properties[selected].anecdote}/>
      <Button action={()=>setSelected(newIndex({maxim}))} text='next anecdote'/>
      <Button action={()=>updateLikes()} text='vote'/>
      <Display text = {'has ' +properties[selected].vote + ' votes'}/>
      <HeaderDisplay header = 'Anecdote with most votes'/>
      <Display text={mostPopular[0].anecdote}/>
      <Display text={'has '+ mostPopular[0].vote + ' votes'}/>
     
    </div>
  )
}

export default App