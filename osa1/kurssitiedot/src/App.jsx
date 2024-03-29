

const Header = (props) => {
  console.log(props)
  return (
  <h1>
    {props.header}
  </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part content = {props.parts[0]} />
      <Part content = {props.parts[1]} />
      <Part content = {props.parts[2]} />
    </div>
  )
}


const Part =(props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {Sum(props.parts[0].exercises,
                               props.parts[1].exercises,
                               props.parts[2].exercises)}
    </p>
  )
}

const Sum = (n1 ,n2, n3) => {
  return n1 + n2 + n3

}


const App = () => {
  const course = {name: 'Half Stack application development',

  parts :  [{name: 'Fundamentals of React',
                exercises: 10
  },
  {name: 'Using props to pass data',
                exercises: 7
  },
  {name:'State of a component',
                exercises: 14
  }]
}

  return (
    <div>
      <Header header = {course.name} />
      <Content parts = {course.parts} />
     <Total parts = {course.parts}/> 
    </div>
  )
}

export default App
