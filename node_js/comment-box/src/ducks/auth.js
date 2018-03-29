import axios from 'axios'
import {Record} from 'immutable'
import {takeEvery, call, put} from 'redux-saga/effects'

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
  user: null,
  token: null
})



export default function reducer (state = new reducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
    case REGISTER:
      return state.set('user', payload.value.data.user).set('token', payload.value.data.token)
    case LOGIN:
      return state.set('user', payload.value.data.user).set('token', payload.value.data.token)
    default:
      return state
  }

}


/*
*Sagas
*/

export const authSaga = function* () {
  yield takeEvery(SIGN_IN, signInSaga)
}

function* signInSaga () {
  yield console.log('SIGN_IN SAGA WORKS!!!')
}
