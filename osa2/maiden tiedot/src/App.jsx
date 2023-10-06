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
  const [Weather, SetWeather] = useState({})
  const [Country_weather_to_show, Set_country_weather_to_show] = useState({})
  const [Lat, SetLat] = useState(0.0)
  const [Lon, SetLon] = useState(0.0)


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

  const handleCountryWeatherToShow =(obj)=>{
    Set_country_weather_to_show(obj)
    SetLat(obj.capitalInfo.latlng[0])
    SetLon(obj.capitalInfo.latlng[1])

  }



  useEffect(()=>{

    const isObjEmpty =(obj)=> {
      return Object.keys(obj).length === 0;
  }

    if (!isObjEmpty(Country_weather_to_show)) {
      console.log(Lat+" ,"+Lon)
      
      CountryService
        .GetWeatherData(Lat , Lon)
        .then(response => {
          console.log("promise for weather data fulfilled")
          SetWeather(response.data)
        })
        .catch(error =>
          console.log(error))

    }

  }, [Country_weather_to_show])

 

  useEffect(()=>{


    CountryService
      .GetAllNames()
      .then(response => {
        console.log("promise for country data fulfilled")
        setCountries(response.data)
          
       } )
      .catch(error => console.log(error))

  }, [])

  return (

      <div>
        <Filter text='find countries' handleFilterChange = {handleFilterChange} />
        { val ? <Countries countries = {filtered} opt = {opt} oneToShow = {ObjToShow} obj = {objToShow_} SetWeather = {handleCountryWeatherToShow}
        weather = {Weather}/> : 'Too many matches. specify another filter'  }
      </div>

  )
}

export default App


