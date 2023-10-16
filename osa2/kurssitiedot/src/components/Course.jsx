const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {
    
    const total = parts.reduce((s, p) => s + p.exercises, 0)

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