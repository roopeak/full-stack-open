import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
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
  }, [])

  const countryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        find countries
        <input 
          value={country} 
          onChange={countryChange}
        />
      </form>
      <div>
        <Filter value={country} data={countries} />
      </div>
    </div>
  )
}

export default App