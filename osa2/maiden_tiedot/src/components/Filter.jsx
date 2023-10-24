import Weather from './Weather'

const Filter = ({ value, data }) => {
    // console.log('This is value: ', value)
    // console.log(`This is data: ${data}`)

    let filtered = []

    if (value.length > 0)
    {
        filtered = data.filter((data) =>
            data.name.common.toLowerCase().includes(value.toLowerCase()))
    }

    if (filtered.length > 10)
    {
        return("Too many matches, specify another filter")
    }
    else if (filtered.length <= 10 && filtered.length > 1)
    {
        return (
            <div>
                {filtered.map(country =>
                    <p key={country.name.common}>
                        {country.name.common}
                    </p>
                )}
            </div>
        )
    }
    else if (filtered.length === 1)
    {
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
                <Weather capital={country.capital} />
                
            </div>
        )
    }
}

export default Filter