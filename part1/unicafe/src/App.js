import { useState } from 'react'
import Decimal from 'decimal.js';

const Button = ({ handleClick, text, color }) => {
  return (
    <button style={{ backgroundColor: color }} onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = new Decimal(good).plus(neutral).plus(bad);
  const average = new Decimal(good - bad).div(all);
  const positive = new Decimal(good).div(all).mul(100).toFixed(1);

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all.toString()} />
        <StatisticLine text="average" value={average.toString()} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + bad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' color='#4CAF50' />
      <Button handleClick={handleNeutralClick} text='neutral' color='#FFFF00' />
      <Button handleClick={handleBadClick} text='bad' color='#FF0000' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App