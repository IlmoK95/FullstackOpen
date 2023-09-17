
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import {useState, useEffect} from 'react'
import NumberService from './services/numbers'


const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [Filtered, setFilteredList] =useState([])






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
          const updatedList = persons.filter( person =>person.id !== id)
          setPersons(updatedList)
          FilteredPersons(updatedList, newFilter)

        }).catch(error => {
          console.log(error)
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

  const handlePersonAddition =(event)=>{

    event.preventDefault()
    const Names = persons.map(person => person.name)
    if (Names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)   
    }
    else {
      const newObj = { name : newName, number : newNumber}
      NumberService
        .AddNew(newObj)
        .then(response => {
          console.log(response.data)
          const newList = persons.concat(response.data)
          setPersons(newList)
          setNewName('')
          setNewNumber('')
          FilteredPersons(newList, newFilter)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  const FilteredPersons =(upDatedList, currentVal)=>{
    console.log(upDatedList)
    const FilteredList = upDatedList.filter(person =>FilterFunction(person, currentVal))
    setFilteredList(FilteredList)
  }

  const handleFilterChange =(event)=>{

    const currentVal = event.target.value
    console.log(currentVal)
    setFilter(currentVal)
    FilteredPersons(persons, currentVal)
  }


  function FilterFunction (person, currentVal){
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
      <People peopleToShow = {Filtered} DelFunction = {handleDelete} />
    </div>
  )

}

export default App

