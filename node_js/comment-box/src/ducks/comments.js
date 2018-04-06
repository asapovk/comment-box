import axios from 'axios'
import {List, Record, OrderedMap} from 'immutable'
import {arrToMap, mapToArr} from '../helpers'

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
const EDIT = 'comment-box/EDIT'
const INPUT = 'comment/box/INPUT'



const reducerRecord = Record({
  entities: new OrderedMap({}),
  status: null,
  input: null
})

const commentRecord = Record({
  id: null,
  user: null,
  text: null,
  article: null
})


export default function reducer (state =  new reducerRecord(), action) {
  const {type, payload} = action
  switch (type){
    case LOAD:
      return state.update('status', status => 'pending')
    case LOAD_REJECTED:
      return state.update('status', status => 'rejected')
    case LOAD_FULFILLED:
      return state.update('entities', entities=>entities.merge(arrToMap(payload.data.records, commentRecord)))
    case ADD:
      return state.update('entities', entities => entities.set(payload.value.data.id, new commentRecord({id: payload.value.data.id,
                                                                                                                user: payload.value.data.user,
                                                                                                              text: payload.value.data.text,
                                                                                                            article: payload.value.data.article})
          ))
    case EDIT:
      return state.update('entities', entities => entities.set(payload.value.data.comment.id, new commentRecord(payload.value.data.comment)))
      .update('input', input => null)
    case DELETED:
      return state.update('entities', entities => entities.delete(payload.value.data.id))
    case INPUT:
      return state.update('input', input => payload)
    default:
      return state
  }
}

export const loadComments = (article, token) => {

  let queryString = ''
  if (article) {
    queryString = '?article='+article
  }
  return {
    type: LOAD,
    payload: axios.get('/api/comment'+queryString, {headers: {'x-access-token': token}})
  }
}


export const createComment = ({text, user, article, token}) => {
  return (dispatch) => {
    const response = dispatch({
        type: CREATE,
        payload: axios.post('/api/comment' ,{
          id: (Date.now() + Math.random()).toString(),
          user,
          text,
          article}, {headers: {'x-access-token': token}})
    })
    response.then((data) => dispatch({
      type: ADD,
      payload: data
    }))
  }
}


export const deleteComment = (commentId, token) => {
  return (dispatch) => {
    const response = dispatch({type: REMOVE,
      payload: axios.delete('api/comment/'+commentId, {headers: {'x-access-token': token}})
    })
    response.then((commentId) => dispatch({
        type: DELETED,
        payload: commentId
    }))
  }
}


export const updateComment = (text, commentId, token) => {
  return (dispatch) => {
    const response = dispatch({
      type: UPDATE,
      payload: axios.put('api/comment/', {text: text, id: commentId}, {headers: {'x-access-token': token}})
    })
    response.then((data)=>dispatch({
      type: EDIT,
      payload: data
    }))
  }

}


export const toggleInput = (commentId) => {
  return {
    type: INPUT,
    payload: commentId
  }
}



/*
* Selectors
*/

export const selectStatus = (commentId, statusId) => {
  if(commentId === statusId) return true
  return false
}

export const commentSelector = (state, commentId = null) => {


  const entities = state.commentReducer.entities.filter((comment)=>comment.article == commentId)
  if (!commentId) return mapToArr(entities).reverse()
  return  mapToArr(entities)
}


export const selectAccessStatus = (state, id) => {
  const comment = state.commentReducer.entities.find((comment)=> comment.id == id)
  const authUser = state.authReducer.user
  if (comment.user ==  authUser.username) return true
  return false
}
