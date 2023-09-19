
import Country from "./Country"
import CountryList from "./CountryList"


const Countries =(props)=>{

    
    const isObjEmpty =(obj)=> {
        return Object.keys(obj).length === 0;
    }

 
    if (!isObjEmpty(props.obj)) {


        return(
            <div>
                <Country obj = {props.obj}/>
            </div>
        )

    }


    return (
        <div>
           { props.opt ? <Country obj = {props.countries[0]} /> : 
                         <CountryList countries = {props.countries} oneToShow = {props.oneToShow}/>}
        </div>
    )
}
export default Countries