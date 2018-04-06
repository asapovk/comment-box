import {TOGGLE_PLAY}  from './actions'

const initialState = {
  playing : false
}



export default function reducer (state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case TOGGLE_PLAY:
      return {...state, playing: payload }
    default:
      return state
  }
}
