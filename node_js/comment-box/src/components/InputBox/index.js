import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createComment} from '../../ducks/comments'

class InputBox extends Component {

  static propTypes = {
    startValue: PropTypes.string.isRequired
  }

  state = {
    input: this.props.startValue
  }

  handleSubmit = () => {
    const text = this.state.input
    if (text) {
      this.props.createComment({text, user: 'asapovk'})
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

export default connect(null,{createComment})(InputBox)
