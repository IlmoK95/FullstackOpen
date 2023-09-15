
const PersonForm =(props)=>{
    return (
        <form>
        <div>
            {props.NameText} <input 
            value= {props.NameValue}
            onChange = {props.NameOnChange}/>
        </div>
        <div>
           {props.NumberText} <input 
           value= {props.NumberValue}
           onChange = {props.NumberOnChange}/>
        <br></br>
            <button type="submit" onClick={props.onClick}>{props.ButtonText}</button>
        </div>
      </form>
    )
}

export default PersonForm