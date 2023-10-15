import { useState } from 'react'

const Display = (props) => {
  
  return (
    <div>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.good + props.neutral + props.bad}</div>
      <div>average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</div>
      <div>positive {props.good / (props.good + props.neutral + props.bad)} %</div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={clickGood}>good</button>
      <button onClick={clickNeutral}>neutral</button>
      <button onClick={clickBad}>bad</button>
      <h1>statistics</h1>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
