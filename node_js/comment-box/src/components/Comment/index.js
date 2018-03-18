import React, {Component} from 'react'


export default class Comment extends Component {
  render() {
    const {user, text} = this.props
    return (
      <div>
        <h2>{user}</h2>
        <div>{text}</div>
      </div>
    )
  }
}
