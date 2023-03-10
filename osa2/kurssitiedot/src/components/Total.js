const Total = ({ exercises }) => {
    const parts = exercises.parts
    
    let number_of_exercises = 0
 
    parts.map(part => number_of_exercises += part.exercises)
    
    return (
        <p>
            <b>total of {number_of_exercises} exercises</b>
        </p>
    )
}

export default Total