const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {
    
    let total = 0

    const sum = parts.map((part) => {
        total += part.exercises
        return part.exercises
    })

    return (
        <div>
            <div>
                {parts.map(part =>
                    <p key={part.id}>
                        {part.name} {part.exercises}
                    </p>)}
            </div>
            <div>
                <p><strong>total of {total} exercises</strong></p>
            </div>
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