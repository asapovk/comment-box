import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import MyPlayer from '../../components/video/MyPlayer'

export default class PlayerRoute extends Component {
  render() {
    return (
      <div>
        <MyPlayer/>
      </div>
    )
  }
}
