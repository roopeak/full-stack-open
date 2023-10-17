import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const found = persons.find((element) => element = nameObject)

    if (found.name === nameObject.name)
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addFilter = (event) => {
    setNewFilter(event.target.value)
    setPersons(
      persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} addFilter={addFilter} />
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addName={addName} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App