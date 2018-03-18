import axios from 'axios'
import {List, Record, OrderedMap} from 'immutable'
import {arrToMap} from '../helpers'

const LOAD = 'comment-box/LOAD'
const LOAD_REJECTED = 'comment-box/LOAD_REJECTED'
const LOAD_FULFILLED = 'comment-box/LOAD_FULFILLED'
const ADD = 'comment-box/ADD'


const CREATE = 'comment-box/CREATE'
const UPDATE = 'comment-box/UPDATE'
const REMOVE = 'comment-box/REMOVE'


const reducerRecord = Record({
  entities: new OrderedMap({}),
  status: null
})

const commentRecord = Record({
  id: null,
  user: null,
  text: null
})


export default function reducer (state =  new reducerRecord(), action) {
  const {type, payload} = action
  switch (type){
    case LOAD:
      return state.update('status', status => 'pending')
    case LOAD_REJECTED:
      return state.update('status', status => 'rejected')
    case LOAD_FULFILLED:
      return state.set('entities', arrToMap(payload.data.records, commentRecord))
    case ADD:
      return state.update('entities', entities => entities.set(action.payload.value.data.id, new commentRecord({id: action.payload.value.data.id, user: action.payload.value.data.user, text: action.payload.value.data.text})))
    case UPDATE:
      return state
    case REMOVE:
      return state
    default:
      return state
  }
}

export const loadComments = () => {
  return {
    type: LOAD,
    payload: axios.get('/api/comment')
  }
}


export const createComment = ({text, user}) => {
  return (dispatch) => {
    const response = dispatch({
        type: CREATE,
        payload: axios.post('/api/comment', {
          id: (Date.now() + Math.random()).toString(),
          user,
          text})
    })
    response.then((data) => dispatch({
      type: ADD,
      payload: data
    }))
  }
}


export function deleteComment(commentId) {
  return {type: REMOVE, payload: commentId
  }
}


export function updateComment({commentId, text}) {
  return {type: UPDATE, payload: {
    commentId,
    text
  }}
}




/*
* Middlewares
*/
