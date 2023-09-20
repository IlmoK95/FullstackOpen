


const Name =(props)=>{
    

    return (
        <div>
            <p key = {props.name}>{props.name}</p><button onClick={()=>props.oneToShow(props.name)}>show</button>
        </div>
    )
}
export default Name