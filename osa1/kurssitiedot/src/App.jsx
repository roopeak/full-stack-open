const Total = (props) => (
  <div>
    <p>Total: {props.course[0].exercises + props.course[1].exercises + props.course[2].exercises}</p>
  </div>
)

const Part = (props) => (
  <div>
    <p>{props.part} {props.exercises}</p>
  </div>
)

const Content = (props) => (
  <div>
    <Part part={props.course[0].name + " " + props.course[0].exercises} />
    <Part part={props.course[1].name + " " + props.course[1].exercises} />
    <Part part={props.course[2].name + " " + props.course[2].exercises} />
  </div>
)

const Header = (props) => (  
  <div>
    <h1>{props.course}</h1>
  </div>
)

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  )
}

export default App