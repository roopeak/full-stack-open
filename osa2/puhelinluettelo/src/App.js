import { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {

    const found = persons.some(e1 => e1.name === newName)

    if ( found === true ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      event.preventDefault()

      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
}



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name:<input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:<input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((name) =>
          <Person key={name.name} name={name} />
        )}
    </div>
  )
}

export default App