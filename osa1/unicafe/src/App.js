import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ( { text, value }) => {
  if ( text == "positive" ) {
    return (
      <p>{text} {value} %</p>
    )
  } else {
    return (
      <p>{text} {value}</p>
    )
  }
}

const Statistics = ({clicks}) => {

  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good - clicks.bad) / 
                  (clicks.good + clicks.neutral + clicks.bad)
  const positive =  clicks.good / 
                    (clicks.good + clicks.neutral + clicks.bad) * 100 
  
  if ( total == 0 ) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  if ( clicks.good == 0 || clicks.bad == 0 ) {
    return (
      <div>
        <p>good {clicks.good}</p>
        <p>neutral {clicks.neutral}</p>
        <p>bad {clicks.bad}</p>
        <p>all {total}</p>
        <p>average 0</p>
        <p>positive 0 %</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value={clicks.good} />
      <StatisticLine text="neutral" value= {clicks.neutral} />
      <StatisticLine text="bad" value={clicks.bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const App = () => {
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <div>
        <Statistics clicks={clicks} />
      </div>
    </div>
  )
}

export default App