import React, { Component } from 'react';
import CommentBox from './components/comments/CommentBox'
import {Route} from 'react-router-dom'
import AuthRoute from './routes/auth'
import GroupRoute from './routes/group'
import PlayerRoute from './routes/video/player'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Route path='/group' component={GroupRoute}/>
      <Route path='/auth' component={AuthRoute}/>
      <Route path='/video/player' component={PlayerRoute} />
      </div>
    )
  }
}

export default App
