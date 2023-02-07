const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts.at(0).name + " " + props.parts.at(0).exercises}/>
      <Part part={props.parts.at(1).name + " " + props.parts.at(1).exercises}/>
      <Part part={props.parts.at(2).name + " " + props.parts.at(2).exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.parts.at(0).exercises + 
        props.parts.at(1).exercises +
        props.parts.at(2).exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of Reacts",
        exercises: 10
      },
      {
        name: "Using props to pass data", 
        exercises: 7
      },
      {
        name: "State of a component", 
        exercises: 14
      }
    ] 
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App