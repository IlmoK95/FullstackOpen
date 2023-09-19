import axios from "axios";
const BaseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"


const GetAllNames =()=> {
    return axios.get(BaseURL)
}


export default {GetAllNames}