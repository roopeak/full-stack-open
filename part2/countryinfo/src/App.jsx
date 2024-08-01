import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [country])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={country} onChange={handleChange} />
      </form>
      <Filter value={country} data={countries} />
    </div>
  )
}

export default App
