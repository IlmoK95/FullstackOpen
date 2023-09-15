import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "12345989" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [Filtered, setFiltering] =useState([])


  const handleNamechange =(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberchange =(event)=>{
    setNewNumber(event.target.value)
  }

  const handlePersonAddition =(event)=>{

    event.preventDefault()
    const Names = persons.map(person => person.name)
    if (Names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)   
    }
    else {
      const newObj = { name : newName, number : newNumber}
      const updatedList = persons.concat(newObj)
      setPersons(updatedList)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange =(event)=>{

    const currentVal = event.target.value
    console.log(currentVal)
    setFilter(currentVal)

    const FilteredList = persons.filter(person =>FilterFunction(person, currentVal))
    setFiltering(FilteredList)
  }

  function FilterFunction (person, currentVal){
    if (currentVal===""){
      return false
    }
    return person.name.includes(currentVal)
  }




  return (
    <div>
      <h2>Phonebook</h2>

        <Filter text = "filter shown with" value={newFilter} onChange={handleFilterChange}/>
        <h2>Add a new</h2>
        <PersonForm NameText = "name:" NameValue = {newName} NameOnChange={handleNamechange}
                    NumberText = "number:" NumberValue = {newNumber} NumberOnChange = {handleNumberchange}
                    ButtonText = "add" onClick = {handlePersonAddition} />

      <h2>Numbers</h2>
      <People peopleToShow = {Filtered} />
    </div>
  )

}

export default App

