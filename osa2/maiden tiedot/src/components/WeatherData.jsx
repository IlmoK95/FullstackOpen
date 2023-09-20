const WeatherData =(props)=>{

    return (
        <div>
            <h2>{`Weather in ${props.capital}`}</h2>
            <p>{`temperature ${props.temp.toFixed(2)} °C`}</p>
            <img src = {`https://openweathermap.org/img/wn/${props.iconData.icon}@2x.png`}/>
            <p>{`wind ${props.wind} m/s`}</p>

        </div>
    )
}
export default WeatherData