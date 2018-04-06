import React, {Component} from 'react'
import {connect} from 'react-redux'
import {togglePlay} from '../../ducks/video/actions'

class PlayButton extends Component {
  state = {
    play: false
  }
  handleClick = () => {
    this.props.togglePlay(this.state.play)
    this.setState({play: !this.state.play})
  }
  render() {
    return (
      <button onClick={this.handleClick}>Play/Pause</button>
    )
  }
}

export default connect (null, {togglePlay})(PlayButton)
