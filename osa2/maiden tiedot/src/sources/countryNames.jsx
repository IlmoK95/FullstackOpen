import axios from "axios";
const BaseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const api_key = import.meta.env.VITE_KEY


const GetAllNames =()=> {
    return axios.get(BaseURL)
}

const GetWeatherData =(lat, lon)=> {
    console.log(lat)
    console.log(lon)
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)

}


export default {GetAllNames, GetWeatherData}