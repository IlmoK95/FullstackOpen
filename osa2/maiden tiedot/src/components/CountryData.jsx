const CountryData =(props)=>{

    return (
        <div>
            capital {props.data[1]}
            <br></br>
            area {props.data[0]}

        </div>
    )
}
export default CountryData