const Lang =(props)=>{
    const langList = Object.values(props.lang)
    return (
        <div>
            <h2>languages</h2>
            <ul>
                {langList.map( language =>
                    <li key ={language} > {language}</li>)}
            </ul>
        </div>
    )
}
export default Lang