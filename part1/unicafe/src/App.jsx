import { useState } from 'react'

const Positive = (props) =>{
  if (props.all == 0) {
    return (
      <p>positive 0 %</p>
    )
  }
  
  return (
    <p>positive {props.good / props.all * 100} %</p>
  )
}

const Average = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad

  const average = (good - bad) / total
  
  if (total == 0) {
    return (
      <p>average 0</p>
    )
  }

  return (
    <p>average {average}</p>
  )
}

const Total = (props) => {
  return (
    <p>all {props.all}</p>
  )
}

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <Total all={props.good + props.neutral + props.bad} />
        <Average 
          good={props.good} 
          neutral={props.neutral} 
          bad={props.bad}
        />
        <Positive 
          good={props.good}
          all={props.good + props.neutral + props.bad}
        />
      </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App