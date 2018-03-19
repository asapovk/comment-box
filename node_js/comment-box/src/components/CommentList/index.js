import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comment from '../Comment'
import {loadComments} from '../../ducks/comments'
import {mapToArr} from '../../helpers'


class CommentList extends Component{
  componentDidMount() {
    this.props.loadComments()
  }
  render() {
      const {status, comments} = this.props
      if(comments[0]) {
        console.log(comments)
        return(
          <div>
            {comments.map(comment=> <Comment key={comment.toJS().id} {...comment.toJS()}/>)}
          </div>
        )}
      else return (
        <div>Loading</div>
      )

    }
}

export default connect((state)=>(
  {
    comments: mapToArr(state.commentReducer.entities).reverse(),
    status: state.commentReducer.status
}),{loadComments})(CommentList)
