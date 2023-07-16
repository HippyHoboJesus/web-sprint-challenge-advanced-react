import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

const URL = `http://localhost:9000/api/result`

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps
    }
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = this.state.index % 3 +1;
    const y = Math.trunc(this.state.index / 3 +1);
    return {x, y}
  }

  getXYMessage = (x, y) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    
    return `Coordinates (${x}, ${y})`
  }

  reset = () => {
    this.setState({
      ...this.state,
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'up') {
      if(this.state.index -3 < 0) {
        return this.setState({
          ...this.state,
          message: "You can't go up"
        })
      }
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps:  this.state.steps + 1,
        message: initialMessage
      })
    } else if(direction === 'down') {
      if(this.state.index + 3 > 8) {
        return this.setState({
          ...this.state,
          message: "You can't go down"
        })
      }
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps:  this.state.steps + 1,
        message: initialMessage
      })
    } else if(direction === 'right') {
      if(this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
        return this.setState({
          ...this.state,
          message: "You can't go right"
        })
      }
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps:  this.state.steps + 1,
        message: initialMessage
      })
    } else if(direction === 'left') {
      if(this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
        return this.setState({
          ...this.state,
          message: "You can't go left"
        })
      }
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps:  this.state.steps + 1,
        message: initialMessage
      })
    }
  }

  move = (evt) => {
    this.getNextIndex(evt.target.id)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    const xy = this.getXY()

    axios.post(URL, { "x": xy.x, "y": xy.y, "steps": this.state.steps, "email": this.state.email })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err))
  }

  render() {
    const xy = this.getXY()
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage(xy.x, xy.y)}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${this.state.index === idx ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
