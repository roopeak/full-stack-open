const Filter = ({ value, data }) => {
  let filtered = []
  
  if (value.length > 0) {
    filtered = data.filter(data =>
      data.name.common.toLowerCase().includes(value.toLowerCase())
    )
  }
  
  if (filtered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filtered.length <= 10 && filtered.length > 1) {
    return (
      <div>
        {filtered.map(country => 
          <p key={country.name.common}>
            {country.name.common}
          </p>
        )}
      </div>
    )
  } else if (filtered.length === 1) {
    const country = filtered[0]

    return (
      <div>
        <h1>{filtered.map(country => country.name.common)}</h1>
        <p>capital {filtered.map(country => country.capital)}</p>
                <p>area {filtered.map(country => country.area)}</p>
                <p><strong>languages:</strong></p>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png} />
      </div>
    )
  }
}

export default Filter