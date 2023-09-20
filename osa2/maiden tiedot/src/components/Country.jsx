import CountryData from "./CountryData"
import Lang from "./CountryLang"
import Flagg from "./Flagg"
import { useEffect } from 'react'
import WeatherData from "./WeatherData"

const Country =(props)=>{

    const name = props.obj.name.common
    const data = [props.obj.area, props.obj.capital]
    const lang = props.obj.languages
    const FlagURL = props.obj.flags.png

    useEffect(()=>{
        props.SetWeather(props.obj)

    }, [])

    const isObjEmpty =(obj)=> {
        return Object.keys(obj).length === 0;
    }

    return (
        <div>
            <h1>{name}</h1>
            <CountryData data = {data} />
            <Lang lang = {lang} />
            <Flagg url = {FlagURL} alt = {`${name} flagg`}/>

            {!isObjEmpty(props.weather) ? <WeatherData wind  = {props.weather.wind.speed} 
            capital = {props.obj.capital} 
            temp = {(props.weather.main.temp - 273.15)} 
            iconData = {props.weather.weather[0]}/>: <p>loading data...</p> }
            
            
            
            
          
        </div>
    )
}
export default Country