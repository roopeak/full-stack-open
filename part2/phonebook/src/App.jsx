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
      id: newName
    }

    const found = persons.find((element) => element = nameObject)

    if (found.name === nameObject.name) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const url = `http://localhost:3001/persons/${id}`
      const person = persons.find(person => person.id === id)

      personService
        .remove(id)
        .catch(error => {
          console.log(error)
        })

      const changedPersons = persons.filter(person => person.id !== id)
      setPersons(changedPersons)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setPersons(
      persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value))
    )
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} removePerson={removePerson} />
    </div>
  )
}

export default App