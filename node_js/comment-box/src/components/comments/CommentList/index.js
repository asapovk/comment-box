import React, {Component} from 'react'
import Comment from '../Comment'



export default class CommentList extends Component{
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
