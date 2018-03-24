import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment, toggleInput, selectStatus, commentSelector, updateComment, loadComments, createComment} from '../../ducks/comments'
import InputBox from '../InputBox'
import CommentList from '../CommentList'

class Comment extends Component {

  state = {

    showReply: false,
    showReplyInputBox: false,
    showCommentEditBox: false
  }

  componentWillReceiveProps(props) {
    if(!props.status) this.setState({showReplyInputBox: false, showCommentEditBox: false})
    console.log('STATE IS CHANGED!')
  }

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.id)
  }
  toggleInputBox = () => {
    this.setState({showCommentEditBox: !this.state.showCommentEditBox})
    if(!this.props.status) this.props.toggleInput(this.props.id)
    else this.props.toggleInput(null)
  }
  handleUpdateComment = (text) => {
    const commentId = this.props.id
    this.props.updateComment(text, commentId)
  }
  toggleReply = () =>{
    this.setState({showReply: !this.state.showReply})
  }
  renderInputBox = (text) => {
    if(this.state.showCommentEditBox) {
      return <InputBox startValue={this.props.text} onSubmitComment={this.handleUpdateComment}/>
    }
    else return <div>{text}</div>
  }
  toggleReplyBox = () => {
    this.setState({showReplyInputBox: !this.state.showReplyInputBox})
    if(!this.props.status) this.props.toggleInput(this.props.id)
    else this.props.toggleInput(null)
  }
  renderReplyInputBox = () => {
    if(this.state.showReplyInputBox) return <InputBox startValue={null} onSubmitComment={this.handleReplyComment}/>
  }
  renderReplyComments = (comments) => {
    if(comments && this.state.showReply) return <CommentList comments={this.props.comments}/>
  }
  handleReplyComment = (text) => {
    this.props.createComment({user: 'asapovk', text, article: this.props.id})
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
        <button onClick={this.toggleReplyBox}>Reply</button>
        {this.renderReplyInputBox()}
        {this.renderReplyComments(comments)}
      </div>
    )
  }
}
export default connect((state, ownProps)=>({status: selectStatus(ownProps.id, state.commentReducer.input), comments: commentSelector(state, ownProps.id),  ...ownProps}), {deleteComment, toggleInput, updateComment, loadComments, createComment})(Comment)
