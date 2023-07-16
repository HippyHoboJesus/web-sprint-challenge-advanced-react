import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [steps, setSteps] = useState(0)
  const [index, setIndex] = useState(4)

  const URL = `http://localhost:9000/api/result`

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = index % 3 +1;
    const y = Math.trunc(index / 3 +1);
    return {x, y}
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const xy = getXY()
    return `Coordinates (${xy.x}, ${xy.y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'up') {
      if(index -3 < 0) {
        return setMessage("You can't go up")
      }
      setIndex(index - 3)
      setSteps(steps + 1)
      setMessage(initialMessage)
    } else if(direction === 'down') {
      if(index + 3 > 8) {
        return setMessage("You can't go down")
      }
      setIndex(index + 3)
      setSteps(steps + 1)
      setMessage(initialMessage)
    } else if(direction === 'right') {
      if(index === 2 || index === 5 || index === 8) {
        return setMessage("You can't go right")
      }
      setIndex(index + 1)
      setSteps(steps + 1)
      setMessage(initialMessage)
    } else if(direction === 'left') {
      if(index === 0 || index === 3 || index === 6) {
        return setMessage("You can't go left")
      }
      setIndex(index - 1)
      setSteps(steps + 1)
      setMessage(initialMessage)
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    const xy = this.getXY()

    axios.post(URL, { "x": xy.x, "y": xy.y, "steps": steps, "email": email })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit" onSubmit={onSubmit}></input>
      </form>
    </div>
  )
}
