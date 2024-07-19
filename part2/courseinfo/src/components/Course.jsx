const Total = ({ parts }) => {
	const total = 
		parts.reduce((sum, part) =>
			sum + part.exercises
	, 0)

	return (
		<p><strong>total of {total} exercises</strong></p>
	)
}

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
			<Total parts={course.parts} />
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
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