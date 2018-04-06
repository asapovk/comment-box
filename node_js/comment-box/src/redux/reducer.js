import commentReducer from '../ducks/comments'
import authReducer from '../ducks/auth'
import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import playerReducer from '../ducks/video'


const reducer = combineReducers({playerReducer, commentReducer, authReducer, router, form})
export default reducer
