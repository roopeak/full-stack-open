const Part = ({ parts }) => {
	return (
		<div>
			{parts.map(part =>
				<p key={part.id}>{part.name} {part.exercises}</p>
			)}
		</div>
	)
}

const Content = ({ course }) => {
  return (
    <div>
			<Part parts={course.parts} />
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Course = ({ course }) => {
    return (
      <div>
        <Header header={course.name} />
        <Content course={course} />
      </div>
    )
}

export default Course