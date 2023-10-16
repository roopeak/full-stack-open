const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>)}
        </div>
    )
}

const Course = ({ course }) => {
    // console.log(course)

    const courseName = course.name
    const parts = course.parts

    return (
        <div>
            <Header courseName={courseName} />
            <Content parts={parts} />
        </div>
    )
}

export default Course