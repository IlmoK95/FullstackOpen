
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import {useState, useEffect} from 'react'
import NumberService from './services/numbers'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [Filtered, setFilteredList] =useState([])
  const [Message, setMessage] = useState('')
  const [errorCode, raiseError] = useState(0)
  // errorCode= 0: no errors raised; 1: error raised //



  useEffect(()=>{
    console.log('effect')
    NumberService
        .getAll()
        .then(response =>{
          console.log('promise fulfilled')
          console.group(response.data)
          setPersons(response.data)
          setFilteredList(response.data)
        }).catch(error => {
            console.log(error)
        })

  }, [] )


  const handleDelete =(id)=>{
    console.log(GetByID(id))
    const personName = GetByID(id)[0].name
    if (window.confirm(`Delete ${personName} ?`)) {
      NumberService
        .Del(id)
        .then(response => {
          console.log(response.data)
          const newList = persons.filter( person =>person.id !== id)
          upDateLists(newList)
          raiseError(0)
          handleMessage(`${personName} deleted`, 0)

        }).catch(error => {
          console.log(error)
          
          raiseError(1)
          handleMessage(`Information of ${personName} was already deleted from server`, 1)

        })
    }
  }


  const GetByID =(id)=>{
    return persons.filter( person => person.id === id)
  }


  const handleNamechange =(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberchange =(event)=>{
    setNewNumber(event.target.value)
  }


  const upDateNumber =()=>{
    const person = persons.find(person => person.name === newName)
    const id = person.id
    const changedPerson = {...person, number : newNumber}

    NumberService
      .upDate(id, changedPerson)
      .then(response => {
        const returnedPerson = response.data
        const newList = persons.map(person => person.id != id ? person : returnedPerson )
        upDateLists(newList)
        ClearInfoFields() 
        handleMessage(`${newName}'s number changed`, 0)

      })
  }


  const upDateLists =(upDatedList)=>{
    setPersons(upDatedList)
    UpDateFilteredPersons(upDatedList, newFilter)
  }


  const ClearInfoFields =()=>{
    setNewName('')
    setNewNumber('')
  }


  const handleMessage =(msg, err)=>{
    raiseError(err)
    setMessage(msg)
    setTimeout(()=>{
      setMessage(null)
    }, 2000)
  }

  const handlePersonAddition =(event)=>{

    event.preventDefault()
    const Names = persons.map(person => person.name)
    if (Names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        upDateNumber()
      }   
    }
    else {
      const newObj = { name : newName, number : newNumber}
      NumberService
        .AddNew(newObj)
        .then(response => {
          console.log(response.data)
          const newList = persons.concat(response.data)
          upDateLists(newList)
          ClearInfoFields()
          handleMessage(`Added ${newName}`, 0)       
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  const UpDateFilteredPersons =(upDatedList, currentVal)=>{
    console.log(upDatedList)
    const FilteredList = upDatedList.filter(person =>FilterFunction(person, currentVal))
    setFilteredList(FilteredList)
  }

  const handleFilterChange =(event)=>{

    const currentVal = event.target.value
    console.log(currentVal)
    setFilter(currentVal)
    UpDateFilteredPersons(persons, currentVal)
  }


  function FilterFunction (person, currentVal){
    return person.name.includes(currentVal)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message = {Message} err = {errorCode}/>
        <Filter text = "filter shown with" value={newFilter} onChange={handleFilterChange}/>
        <h2>Add a new</h2>
        <PersonForm NameText = "name:" NameValue = {newName} NameOnChange={handleNamechange}
                    NumberText = "number:" NumberValue = {newNumber} NumberOnChange = {handleNumberchange}
                    ButtonText = "add" onClick = {handlePersonAddition} />

      <h2>Numbers</h2>
      <People peopleToShow = {Filtered} DelFunction = {handleDelete} />
    </div>
  )

}

export default App

