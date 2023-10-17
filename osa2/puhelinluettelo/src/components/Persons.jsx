const Persons = (props) => {
    const persons = props.persons
    
    return (
        <div>
            {persons.map(person =>
                <p key={person.name}>
                {person.name} {person.number}
                </p>
            )}
        </div>
    )
}

export default Persons