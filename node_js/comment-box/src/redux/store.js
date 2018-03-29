import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
//import commentMid from '../ducks/comment'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import history from '../history'
import createSagaMiddleware from 'redux-saga'
import {authSaga} from '../ducks/auth'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware,thunk,logger,promise(), routerMiddleware(history))
const store = createStore(reducer, enhancer)

sagaMiddleware.run(authSaga)


export default store
