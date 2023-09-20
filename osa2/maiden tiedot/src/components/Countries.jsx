
import Country from "./Country"
import CountryList from "./CountryList"


const Countries =(props)=>{
 
    const isObjEmpty =(obj)=> {
        return Object.keys(obj).length === 0;
    }

    if (!isObjEmpty(props.obj)) {

        
        return(
            <div>
                <Country obj = {props.obj} SetWeather = {props.SetWeather}
                weather = {props.weather}/>
            </div>
        )

    }


    return (
        <div>
           { props.opt ? <Country obj = {props.countries[0]} SetWeather = {props.SetWeather}
                weather = {props.weather}/> : 
                         <CountryList countries = {props.countries} oneToShow = {props.oneToShow}/>}
        </div>
    )
}
export default Countries