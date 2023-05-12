import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering...', counter)

  const increaseByOne = () => {
    console.log('increase by one...', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    console.log('decrease by one...', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('set to zero...', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

export default App