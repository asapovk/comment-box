import React, { Component } from 'react';
import CommentBox from './components/comments/CommentBox'
import {Route} from 'react-router-dom'
import AuthRoute from './routes/auth'
import GroupRoute from './routes/group'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Route path='/group' component={GroupRoute}/>
      <Route path='/auth' component={AuthRoute}/>
      </div>
    )
  }
}

export default App
