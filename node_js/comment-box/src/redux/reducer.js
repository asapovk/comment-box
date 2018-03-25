import commentReducer from '../ducks/comments'
import authReducer from '../ducks/auth'
import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'


const reducer = combineReducers({commentReducer, authReducer, router, form})
export default reducer
