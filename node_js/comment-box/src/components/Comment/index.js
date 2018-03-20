import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteComment, toggleInput, selectStatus} from '../../ducks/comments'
import InputBox from '../InputBox'

class Comment extends Component {

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.id)
  }
  toggleInputBox = () => {
    if(!this.props.status) this.props.toggleInput(this.props.id)
    else this.props.toggleInput(null)
  }
  renderInputBox = () => {
    if(this.props.status) {
      return <InputBox startValue={this.props.text}/>
    }
  }
  render() {
    const {user, text} = this.props
    return (
      <div>
        <h2>{user}</h2>
        <div>{text}</div>
        {this.renderInputBox()}
        <button onClick={this.handleDeleteComment}>Delete</button>
        <button onClick={this.toggleInputBox}>Edit</button>
      </div>
    )
  }
}
export default connect((state, ownProps)=>({status: selectStatus(ownProps.id, state.commentReducer.input), ...ownProps}), {deleteComment, toggleInput})(Comment)
