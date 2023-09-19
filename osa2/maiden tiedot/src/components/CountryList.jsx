import Name from "./CountryName"

const CountryList =(props)=>{

    return (
        <div>
            {props.countries.map(country => 
                <Name key = {country.name.common} name = {country.name.common}  oneToShow = {props.oneToShow}/>)
            }
                               
            

        </div>
    )
}
export default CountryList