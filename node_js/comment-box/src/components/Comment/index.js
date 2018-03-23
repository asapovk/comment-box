import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment, toggleInput, selectStatus, commentSelector, updateComment, loadComments} from '../../ducks/comments'
import InputBox from '../InputBox'
import CommentList from '../CommentList'

class Comment extends Component {

  state = {
    showReply: false
  }

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.id)
  }
  toggleInputBox = () => {
    if(!this.props.status) this.props.toggleInput(this.props.id)
    else this.props.toggleInput(null)
  }
  handleUpdateComment = (text) => {
    const commentId = this.props.id
    this.props.updateComment(text, commentId)
  }
  toggleReply = () =>{
    this.setState({showReply: !this.state.showReply})
    this.props.loadComments(this.props.id)
  }
  renderInputBox = (text) => {
    if(this.props.status) {
      return <InputBox startValue={this.props.text} onSubmitComment={this.handleUpdateComment}/>
    }
    else return <div>{text}</div>
  }
  renderReplyComments = (comments) => {
    if(comments && this.state.showReply) return <CommentList comments={this.props.comments}/>
  }
  render() {
    const {user, text, comments} = this.props
    return (
      <div>
        <h2>{user}</h2>
        {this.renderInputBox(text)}
        <button onClick={this.handleDeleteComment}>Delete</button>
        <button onClick={this.toggleInputBox}>Edit</button>
        <button onClick={this.toggleReply}>Show reply</button>
        {this.renderReplyComments(comments)}
      </div>
    )
  }
}
export default connect((state, ownProps)=>({status: selectStatus(ownProps.id, state.commentReducer.input), comments: commentSelector(state, ownProps.id),  ...ownProps}), {deleteComment, toggleInput, updateComment, loadComments})(Comment)
