const Header = (props) =>  {
  return (
    <h1>Course: {props.course}</h1>
  )
}
const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises2} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}
const Total = (props) => {
  return (
    <h6 >Total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</h6>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App

