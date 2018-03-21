import React, {Component} from 'react'
import CommentList from '../CommentList'
import InputBox from '../InputBox'
import {createComment} from '../../ducks/comments'
import {connect} from 'react-redux'

class CommentBox extends Component{
  render() {
    return (
      <div>
        <InputBox startValue = {null} onSubmitComment={this.props.createComment}/>
        <CommentList/>
      </div>
    )
  }
}

export default connect (null,{createComment})(CommentBox)
