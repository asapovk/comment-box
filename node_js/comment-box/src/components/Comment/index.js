import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment, toggleInput, selectStatus, updateComment} from '../../ducks/comments'
import InputBox from '../InputBox'

class Comment extends Component {

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.id)
  }
  toggleInputBox = () => {
    if(!this.props.status) this.props.toggleInput(this.props.id)
    else this.props.toggleInput(null)
  }
  handleUpdateComment = ({text, user}) => {
    const commentId = this.props.id
    this.props.updateComment(text, commentId)
  }
  renderInputBox = (text) => {
    if(this.props.status) {
      return <InputBox startValue={this.props.text} onSubmitComment={this.handleUpdateComment}/>
    }
    else return <div>{text}</div>
  }
  render() {
    const {user, text} = this.props
    return (
      <div>
        <h2>{user}</h2>
        {this.renderInputBox(text)}
        <button onClick={this.handleDeleteComment}>Delete</button>
        <button onClick={this.toggleInputBox}>Edit</button>
      </div>
    )
  }
}
export default connect((state, ownProps)=>({status: selectStatus(ownProps.id, state.commentReducer.input), ...ownProps}), {deleteComment, toggleInput, updateComment})(Comment)
