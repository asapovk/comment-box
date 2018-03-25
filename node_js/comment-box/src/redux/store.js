import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
//import commentMid from '../ducks/comment'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import history from '../history'



const enhancer = applyMiddleware(thunk,logger,promise(), routerMiddleware(history))
const store = createStore(reducer, enhancer)




export default store
