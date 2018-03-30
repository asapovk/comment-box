import axios from 'axios'
import {Record} from 'immutable'
import {takeEvery, call, put, all} from 'redux-saga/effects'

const SIGN_IN = 'auth/SIGN_IN'
const LOGIN = 'auth/LOGIN'
const SIGN_UP = 'auth/SIGN_UP'
const REGISTER = 'auth/REGISTER'


export const signIn = (email, password) => {
 return (dispatch) => {
      const response = dispatch({
      type: SIGN_IN,
      payload: axios.post('/api/signin', {email, password})})
      response.then((data)=>{
        dispatch({type: LOGIN,
            payload: data
        })
      })
  }
}

export const signUp = (email, password) => {
 return (dispatch) => {
      const response = dispatch({
      type: SIGN_UP,
      payload: axios.post('/api/signup', {email, password})})
      response.then((data)=>{
        dispatch({type: REGISTER,
            payload: data
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
2Hv0J_c,Jd!
*/
/*
*Sagas
*/

const saveTokenToStorage = (token) => {
  window.localStorage.setItem('token', token)
}
const getTokenFromStorage = () => {
  return window.localStorage.getItem('token')
}

export const authSaga = function* () {
  yield all([takeEvery(LOGIN, signInSaga),
            takeEvery('@@router/LOCATION_CHANGE', setUserSaga)
  ])
}

const signInSaga = function* (action) {
  const token = action.payload.value.data.token
  yield call(saveTokenToStorage, token)
}

const setUserSaga = function* () {
  const token = yield call(getTokenFromStorage)
  const mockUser = {
    email: 'mail@example.com',
    username: 'asapovk',
    password: '123456'
  }
  yield put({type: LOGIN, payload: {value: {data: {token: token, user: mockUser}}}})
}
