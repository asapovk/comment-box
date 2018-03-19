import axios from 'axios'
import {List, Record, OrderedMap} from 'immutable'
import {arrToMap} from '../helpers'

const LOAD = 'comment-box/LOAD'
const LOAD_REJECTED = 'comment-box/LOAD_REJECTED'
const LOAD_FULFILLED = 'comment-box/LOAD_FULFILLED'
const ADD = 'comment-box/ADD'

const REMOVE = 'comment-box/REMOVE'
const REMOVE_REJECTED = 'comment-box/REMOVE_REJECTED'
const REMOVE_FULFILLED = 'comment-box/REMOVE_FULFILLED'
const DELETED = 'comment-box/DELETED'


const CREATE = 'comment-box/CREATE'
const UPDATE = 'comment-box/UPDATE'



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
      return state.update('entities', entities => entities.set(payload.value.data.id, new commentRecord({id: payload.value.data.id,
                                                                                                                user: payload.value.data.user,
                                                                                                                text: payload.value.data.text})
          ))
    case UPDATE:
      return state
    case DELETED:
      return state.update('entities', entities => entities.delete(payload.value.data.id))
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


export const deleteComment = (commentId) => {
  return (dispatch) => {
    const response = dispatch({type: REMOVE,
      payload: axios.delete('api/comment/'+commentId)
    })
    response.then((commentId) => dispatch({
        type: DELETED,
        payload: commentId
    }))
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
