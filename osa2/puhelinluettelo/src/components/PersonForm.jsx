const PersonForm = (props) => {
    const newName = props.newName
    const newNumber = props.newNumber
    const addName = props.addName
    const handleNameChange = props.handleNameChange
    const handleNumberChange = props.handleNumberChange
    
    return (
        <form onSubmit={addName}>
            <div>
            name: 
            <input 
            value={newName}
            onChange={handleNameChange}
            />
            </div>
            <div>
            number:
            <input
            value={newNumber}
            onChange={handleNumberChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
