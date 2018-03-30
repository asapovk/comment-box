import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment, toggleInput, selectStatus, commentSelector, updateComment, loadComments, createComment} from '../../../ducks/comments'
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
    const {id, token} = this.props
    this.props.deleteComment(id,token)
  }
  toggleInputBox = () => {
    const {status, id} = this.props
    this.setState({showCommentEditBox: !this.state.showCommentEditBox})
    if(!status) this.props.toggleInput(id)
    else this.props.toggleInput(null)
  }
  handleUpdateComment = (text) => {
    const {id, token} = this.props
    this.props.updateComment(text, id, token)
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
    const {status, id} = this.props
    this.setState({showReplyInputBox: !this.state.showReplyInputBox})
    if(!status) this.props.toggleInput(id)
    else this.props.toggleInput(null)
  }
  renderReplyInputBox = () => {
    if(this.state.showReplyInputBox) return <InputBox startValue={null} onSubmitComment={this.handleReplyComment}/>
  }
  renderReplyComments = (comments) => {
    if(comments && this.state.showReply) return <CommentList comments={this.props.comments}/>
  }
  handleReplyComment = (text) => {
    const {postUser, id, token} = this.props
    this.props.createComment({user: postUser.username, text, article: id, token})
    this.setState({showReplyInputBox: false, showReply: true})
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
export default connect((state, ownProps)=>({status: selectStatus(ownProps.id, state.commentReducer.input),
                                            comments: commentSelector(state, ownProps.id), 
                                            postUser: state.authReducer.user,
                                            token: state.authReducer.token,  ...ownProps}),
    {deleteComment, toggleInput, updateComment, loadComments, createComment})(Comment)
