import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryService from './sources/countryNames'
import Filter from './components/Filter'
import Countries from './components/Countries'



const App =()=> {

  const [CountryObjs, setCountries] = useState([])
  const [val, renderData] = useState(true)
  const [filter, SetFilter] = useState("")
  const [filtered, setFilteredList] = useState([])
  const [filteredLen, setFilteredLen] = useState(null)
  const [opt, ShowOne] = useState(false)
  const [objToShow_, SetToShow] = useState({})


  const ObjToShow=(id)=>{
      const obj = filtered.find(object => object.name.common === id)
      SetToShow(obj)
      console.log(id)
      
  }


  const handleFilteredList =(filter)=>{

    const objs = CountryObjs.filter(obj => obj.name.common.includes(filter))
    RenderRules(objs)
    setFilteredList(objs)

  }


  const RenderRules=(objs)=>{
    if (objs.length > 10){
      renderData(false)
    }
    else {
      renderData(true)
      ShowOne(false)
      if (objs.length == 1){
        ShowOne(true)
      }
    }
    setFilteredLen(objs.len)
  }


  const handleFilterChange =(event)=>{
    const val = event.target.value
    SetFilter(val)
    handleFilteredList(val)
    SetToShow({})

  }

 

  useEffect(()=>{


    CountryService
      .GetAllNames()
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
          
       } )
      .catch(error => console.log(error))

  }, [])

  return (

      <div>
        <Filter text='find countries' handleFilterChange = {handleFilterChange} />
        { val ? <Countries countries = {filtered} opt = {opt} oneToShow = {ObjToShow} obj = {objToShow_}/> : 'Too many matches. specify another filter'  }
      </div>

  )
}

export default App


