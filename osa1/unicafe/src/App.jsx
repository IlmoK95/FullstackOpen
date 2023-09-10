import { useState } from 'react'


const StatisticLine =(props)=> {
return(

    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>

)
}


const ShowStats =(props)=>{

  const good = props.goodVal
  const neutral = props.neutralVal
  const bad = props.badVal

  const All = good + neutral + bad
  const Average = (good-bad) / All 
  const Positive = (good / All)*100  

  if (All===0) {

    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <table>
        <StatisticLine text = 'good' value = {good}/>
        <StatisticLine text = 'neutral' value = {neutral}/>
        <StatisticLine text = 'bad' value = {bad}/>
        <StatisticLine text = 'all' value = {All}/>
        <StatisticLine text = 'average' value = {Average}/>
        <StatisticLine text = 'positive' value = {Positive + ' %'}/>
      </table>
      
    </div>

  )

}


const Button =(props)=>{
  return(
    <button onClick={props.action}>{props.text}</button>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button action = {()=> setGood(good + 1)} text = 'good' />
      <Button action = {()=> setNeutral(neutral + 1)} text = 'neutral' />
      <Button action = {()=> setBad(bad + 1)} text = 'bad' />
      <br />
      <h1>statistics</h1>
      <br/>
      <ShowStats goodVal = {good} neutralVal = {neutral} badVal = {bad}/>
    </div>
  )
}

export default App