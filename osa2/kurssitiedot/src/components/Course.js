const Course = ({ course }) => {   
    return (
        <div>
            <Header header={course.name} />
            <Content content={course} />
            <Total exercises={course} />
        </div>
    )
}

const Header = ({ header }) => { 
    return (
        <h2>{header}</h2>
    )
}

const Content = ({ content}) => {
    return(
        <div>
            <Part parts={content.parts} />
        </div>
    )
}

const Total = ({ exercises }) => {
    const parts = exercises.parts
    
    const exerciseArray = parts.map(part => part.exercises)
 
    const initialValue = 0
    const total = exerciseArray.reduce(
        (accumulator, currentValue) =>
        accumulator + currentValue,
        initialValue
    )                  

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Part = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
        </div>
    )
}

export default Course