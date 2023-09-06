

const Header = (props) => {
  return (
  <h1>
    {props.header}
  </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part content = {props.content1} number = {props.number1}/>
      <Part content = {props.content2} number = {props.number2}/>
      <Part content = {props.content3} number = {props.number3}/>
    </div>
  )
}


const Part =(props) => {
  return (
    <p>
      {props.content} {props.number}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}


const App = () => {
  const course = 'Full Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 450

  return (
    <div>
      <Header header = {course} />
      <Content content1 ={part1} number1 ={exercises1} 
               content2 ={part2} number2 ={exercises2}
               content3 ={part3} number3 ={exercises3}
              />
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
