import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
//import commentMid from '../ducks/comment'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'




const enhancer = applyMiddleware(thunk,logger,promise())
const store = createStore(reducer, enhancer)




export default store
