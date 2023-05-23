import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    peopleService
      .getAll()
      .then(initialPeople => {
        console.log('InitialPeople:', initialPeople);
        setPeople(initialPeople);
      })
      .catch(error => {
        console.log('Error fetching people:', error);
      });
  };

  useEffect(hook, [])

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
    }

    if (people.some(person => person.name === newPerson)) {
      if (window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)) {
        const person = people.find(person => person.name === newPerson)
        const changedPerson = { ...person, number: newNumber }

        peopleService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewPerson('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPeople(people.filter(p => p.id !== person.id))
          })
      }
      return
    }

    peopleService
      .create(personObject)
      .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setSuccessMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewPerson('')
        setNewNumber('')
      }
      )
  }

  const handleDelete = (id) => {
    peopleService
      .deletePerson(id)
      .then(() => {
        peopleService.getAll().then(updatedPeople => {
          setPeople(updatedPeople);
          setSuccessMessage(
            `Deleted person`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      })
      .catch(error => {
        setErrorMessage(
          `Information of the person has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      });
  }

  const peopleToShow = filter
    ? people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : people

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type='error' />
      <Notification message={successMessage} type='success' />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
