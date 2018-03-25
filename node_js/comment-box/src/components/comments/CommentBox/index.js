import React, {Component} from 'react'
import CommentList from '../CommentList'
import InputBox from '../InputBox'
import {createComment, loadComments, commentSelector} from '../../../ducks/comments'
import {mapToArr} from '../../../helpers'
import {connect} from 'react-redux'

class CommentBox extends Component{
  componentDidMount() {
    this.props.loadComments()
  }
  handleCreateComment = (text) =>
  { this.props.createComment({user: 'asapovk', text, article: null})}
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
                                  status: state.commentReducer.status}),
{createComment, loadComments})(CommentBox)
