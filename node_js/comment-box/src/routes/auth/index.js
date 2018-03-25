import React, { Component } from 'react';
import SignInForm from '../../components/auth/sign-in-form'
import SignUpForm from '../../components/auth/sign-up-form'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn, signUp} from '../../ducks/auth'

class AuthRoute extends Component {
  render() {
    return (
      <div>
      <div>
          <div><NavLink to="/auth/sign-in" activeStyle={{color: 'red'}}>Sign In</NavLink></div>
          <div><NavLink to="/auth/sign-up" activeStyle={{color: 'red'}}>Sign Un</NavLink></div>
      </div>
      <div>
        <Route path="/auth/sign-in"  render={ () => <SignInForm onSubmit={this.handleSignIn}/>}/>
        <Route path="/auth/sign-up"  render={ () => <SignUpForm onSubmit={this.handleSignUp}/>}/>
      </div>
      </div>
    )
  }
  handleSignIn = ({email, password}) => this.props.signIn(email, password)
  handleSignUp = ({email, password}) => this.props.signUp(email, password)
}

export default connect(null,{signIn, signUp})(AuthRoute)
