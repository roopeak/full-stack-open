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

export default Total