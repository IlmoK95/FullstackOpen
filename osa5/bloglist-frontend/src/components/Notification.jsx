const Notification =(props)=>{

  const messageStyle = {color : 'green'}
  const errorMessageStyle = {color : 'red'}

  return (
    <div>
      <h3 style={messageStyle}>{props.message}</h3>
      <h3 style={errorMessageStyle}>{props.errorMessage}</h3>   
    </div>
  )
}
export default Notification