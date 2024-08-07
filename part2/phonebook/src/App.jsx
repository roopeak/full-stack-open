import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const existingPerson = persons.find(person => person.name === nameObject.name)

    if (existingPerson) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber(existingPerson.id, nameObject.number)
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(
            `Removed ${person.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const updateNumber = (id, number) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: number}

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
      })
      .catch(error => {
        console.error('Error updating person: ', error)
      })

      setNotificationMessage(
        `Updated ${changedPerson.name}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      <Notification 
        message={notificationMessage} 
        error={errorMessage}  
      />
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