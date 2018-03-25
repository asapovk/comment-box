import React, { Component } from 'react';

class ErrorField extends Component {
  render() {
    const {input, type, meta: {error, touched}, label} = this.props
    const errorText = error && touched  && <h4 style ={{color: 'red'}}>{error}</h4>
    console.log('Error is ---'+error)
    return (
      <div>
          {label}: <input {...input} type={type}/>
          {errorText}
      </div>
    )
  }
}

export default ErrorField;
