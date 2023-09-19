const Filter =(props)=>{

    return (
        <div>
            {props.text}<input onChange={props.handleFilterChange}></input>
        </div>
    )
}
export default Filter