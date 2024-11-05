import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [authorBornYear, setAuthorBornYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name
  }))

  const submit = async (event) => {
    event.preventDefault()

    if (selectedOption) {
      const bornYearInt = parseInt(authorBornYear)

      await updateAuthor({ 
        variables: { name: selectedOption.value, born: bornYearInt }
      })
  
      setSelectedOption(null)
      setAuthorBornYear('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <Select
            defaultValue={selectedOption}
            onChange={(option) => setSelectedOption(option)}
            options={authorOptions}
            placeholder='Select author'
          />
          <div>
            born
            <input
              value={authorBornYear}
              onChange={({ target }) => setAuthorBornYear(target.value)}
              disabled={!selectedOption}
              />
          </div>
          <div>
            <button type='submit'>update author</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
