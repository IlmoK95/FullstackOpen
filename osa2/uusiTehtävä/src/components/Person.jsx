const Person =(props)=>{
    return(
        <div>
            <p key={props.id}>{props.name} {props.number}</p>
            <button onClick={()=>props.delFunction(props.id)}>delete</button>
        </div>
    )
}

export default Person