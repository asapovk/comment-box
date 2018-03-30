import React, {Component} from 'react'
import CommentList from '../CommentList'
import InputBox from '../InputBox'
import {createComment, loadComments, commentSelector} from '../../../ducks/comments'
import {mapToArr} from '../../../helpers'
import {connect} from 'react-redux'

class CommentBox extends Component{
  componentDidMount() {
    this.props.loadComments(null, this.props.token)
  }
  handleCreateComment = (text) =>
  { this.props.createComment({user: this.props.postUser.username, text, article: null, token: this.props.token})}
  render() {
    return (
      <div>
        <InputBox startValue = {null} onSubmitComment={this.handleCreateComment}/>
        <CommentList comments={this.props.comments} status={this.props.status}/>
      </div>
    )
  }
}

export default connect ((state)=>({comments: commentSelector(state),
                                  status: state.commentReducer.status, postUser: state.authReducer.user, token: state.authReducer.token}),
{createComment, loadComments})(CommentBox)
