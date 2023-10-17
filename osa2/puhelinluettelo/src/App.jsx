import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')



  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      personService
        .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
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

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) 
    {
      const url = `http://localhost:3001/persons/${id}`
      const person = persons.find(n => n.id === id)
    
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          console.log('deleted')
        })
        .catch(error => {
          console.error(error)
        })

      const changedPersons = persons.filter((person) => person.id !== id)
      setPersons(changedPersons)
    }
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
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App