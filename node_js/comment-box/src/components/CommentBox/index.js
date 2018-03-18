import React, {Component} from 'react'
import CommentList from '../CommentList'
import InputBox from '../InputBox'

export default class CommentBox extends Component{
  render() {
    return (
      <div>
        <InputBox/>
        <CommentList/>
      </div>  
    )
  }
}
