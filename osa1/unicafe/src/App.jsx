import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      <div>{props.text} {props.value}</div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = props.good / all * 100 + ' %'

  if (props.good > 0 || props.bad > 0 | props.neutral > 0)
  {
    return (
      <div>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </div>
    )
  }
  else
  {
    return (
      <div>No feedback given</div>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={clickGood} text='good' />
      <Button onClick={clickNeutral} text='neutral' />
      <Button onClick={clickBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
