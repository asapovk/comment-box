import React, {Component} from 'react'
import PropTypes from 'prop-types'



export default class InputBox extends Component {

  static propTypes = {
    startValue: PropTypes.isRequired
  }

  state = {
    input: this.props.startValue
  }

  handleSubmit = () => {
    const text = this.state.input
    const initialText = this.props.startValue
    if (text && text !== initialText) {
      this.props.onSubmitComment(text)
      this.setState({input: ''})
    }
  }
  handleKeyUp = (e) => {
    this.setState({input: e.target.value})
  }
  render () {
    return (
      <div>
        <textarea rows="4" cols="50" onChange={this.handleKeyUp} value={this.state.input}/>
        <button onClick={this.handleSubmit} >Submit</button>
      </div>
    )
  }
}
