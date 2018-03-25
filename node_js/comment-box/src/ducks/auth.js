import axios from 'axios'
import {Record} from 'immutable'

const SIGN_IN = 'auth/SIGN_IN'
const LOGIN = 'auth/LOGIN'
const SIGN_UP = 'auth/SIGN_UP'
const REGISTER = 'auth/REGISTER'


export const signIn = (email, password) => {
 return (dispatch) => {
      const response = dispatch({
      type: SIGN_IN,
      payload: axios.post('/api/signin', {email, password})})
      response.then((user)=>{
        dispatch({type: LOGIN,
            payload: user
        })
      })

  }
}

export const signUp = (email, password) => {
 return (dispatch) => {
      const response = dispatch({
      type: SIGN_UP,
      payload: axios.post('/api/signup', {email, password})})
      response.then((user)=>{
        dispatch({type: REGISTER,
            payload: user
        })
      })

  }
}

const reducerRecord = Record({
  user: null
})



export default function reducer (state = new reducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
    case REGISTER:
      return state.set('user', payload)
    case LOGIN:
      return state.set('user', payload)
    default:
      return state
  }

}
