import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
    
  const handleGoodClick = () => {
    const newClicks = {
      good: clicks.good + 1,
      neutral: clicks.neutral,
      bad: clicks.bad
    }
    // console.log("good: ", clicks.good)
    setClicks(newClicks)
  }

  const handleNeutralClick = () => {
    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral + 1,
      bad: clicks.bad
    }
    // console.log("neutral: ", clicks.neutral)

    setClicks(newClicks)
  }

  const handleBadClick = () => {
    const newClicks = {
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad + 1
    }
    // console.log("bad: ", clicks.bad)
    setClicks(newClicks)
  }

  const Total = () => {
    const total = clicks.good + clicks.neutral + clicks.bad
    return (
      <p>all {total}</p>
    )
  }

  const Average = () => {
    if ( clicks.good == 0 || clicks.bad == 0 ) {
      return (
        <p>average 0</p>
      )
    }

    const average = (clicks.good - clicks.bad) / 
    (clicks.good + clicks.neutral + clicks.bad)
    
    return (
      <p>average {average}</p>
    )
  }

  const Positive = () => {
    if ( clicks.good == 0 || clicks.neutral == 0 || clicks.bad == 0 ) {
      return (
        <p>positive 0 %</p>
      )
    }

    const positive = clicks.good / 
    (clicks.good + clicks.neutral + clicks.bad) * 100 
    
    return (
      <p>positive {positive} %</p>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      {/* BUTTONS */}
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <div>
        <p>good {clicks.good}</p>
        <p>neutral {clicks.neutral}</p>
        <p>bad {clicks.bad}</p>
        <Total />
        <Average />
        <Positive />
      </div>
    </div>
  )
}

export default App