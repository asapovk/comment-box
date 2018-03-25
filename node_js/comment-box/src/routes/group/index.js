import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import CommentBox from '../../components/comments/CommentBox'

export default class GroupRoute extends Component {
  render() {
    return <CommentBox/>
  }
}
