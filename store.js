import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const NODE_ENV = process.env.NODE_ENV || "development"

const InitialState = {
  
}

export const actionTypes = {
  
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes:
      return Object.assign({}, state, {
        
      })
    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}


export function initializeStore (initialState = exampleInitialState) {
  if(NODE_ENV == "production"){
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  }else{
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  }
}
