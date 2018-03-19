import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment} from '../../ducks/comments'

class Comment extends Component {
  handleDeleteComment = () =>{
    this.props.deleteComment(this.props.id)
  }
  render() {
    const {user, text} = this.props
    return (
      <div>
        <h2>{user}</h2>
        <div>{text}</div>
        <button onClick={this.handleDeleteComment}>Delete</button>
      </div>
    )
  }
}
export default connect((state, ownProps)=>({...ownProps}), {deleteComment})(Comment)
