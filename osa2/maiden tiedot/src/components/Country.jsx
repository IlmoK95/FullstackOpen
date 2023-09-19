import CountryData from "./CountryData"
import Lang from "./CountryLang"
import Flagg from "./Flagg"

const Country =(props)=>{

    const name = props.obj.name.common
    const data = [props.obj.area, props.obj.capital]
    const lang = props.obj.languages
    const FlagURL = props.obj.flags.png

    return (
        <div>
            <h1>{name}</h1>
            <CountryData data = {data} />
            <Lang lang = {lang} />
            <Flagg url = {FlagURL} alt = {`${name} flagg`}/>
          
        </div>
    )
}
export default Country