

const Notification=(props)=>{
    const msgStyleOk = {
        color: 'green',
        border: 'solid',
        borderRadius: 5,
        background: '#C8C8C8',
        fontSize: 15,
        padding: 5
    }

    const msgStyleFail = {...msgStyleOk, color:'red'}

    const style = props.err ? msgStyleFail : msgStyleOk

    return(
        <p style={props.message ? style : null}>{props.message ? props.message : " "}</p>
    )
}

export default Notification