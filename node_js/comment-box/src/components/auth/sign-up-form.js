import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class SignUpForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>Sign In</h2>
          <Field name="email" label="Email" component={ErrorField}/>
          <Field name="password" label="Password" component={ErrorField} type="password"/>
        <button type="submit">Submit</button>
      </form>
    )
  }

}

const validate = ({email, password}) => {
  const errors = {}
  if(!email) {
    errors.email = 'email is required!'
  }
  if(email && !emailValidator.validate(email))
    {errors.email = 'email is incorrect!'}

  if(!password) {
    errors.password = 'password is required!'
  }
  if(password && password.length < 8) {
    errors.email = 'password mast be no less than 8 characters!'
  }
  return errors
}



export default reduxForm({
  form: 'auth',
  validate
})(SignUpForm);
