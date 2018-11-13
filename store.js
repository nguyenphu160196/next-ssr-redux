import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const NODE_ENV = process.env.NODE_ENV || "development"

const InitialState = {
  progressValue: 0,
  progressStatus: '',
  progressWidth: 1
}

export const actionTypes = {
  UPDATE_STATE: 'UPDATE_STATE',
  ON_PROGRESS_BAR: 'ON_PROGRESS_BAR',
  OFF_PROGRESS_BAR: 'OFF_PROGRESS_BAR',
  UPDATE_WIDTH: 'UPDATE_WIDTH'
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STATE:
      return Object.assign({}, state, {
        message: action.payload
      })
    case actionTypes.ON_PROGRESS_BAR:
      return Object.assign({}, state, {
        progressValue: action.payload,
        progressStatus: "",
      })
    case actionTypes.OFF_PROGRESS_BAR:
      return Object.assign({}, state, {
        progressStatus: action.payload
      })
    case actionTypes.UPDATE_WIDTH:
      return Object.assign({}, state, {
        progressWidth: action.payload
      })
    default: return state
  }
}

// ACTION

export const updateState = (text, type) => dispatch => {
  if(text) {
    dispatch({
      type: actionTypes.UPDATE_STATE,
      payload: {
        text: text,
        type: type
      }
    })
  } else {
    dispatch({
      type: actionTypes.UPDATE_STATE
    })
  }
}

export const turnonProgress = _ => (dispatch, getState) => {
  let {progressWidth} = {...getState().main}
  if(isNaN(parseInt(progressWidth))) {
    progressWidth = 0
  }
  let id = setInterval(_ => {
    if (progressWidth >= 98) {
      clearInterval(id)
      dispatch({
        type: UPDATE_WIDTH,
        payload: 98
      })
      setTimeout(function() {
        turnoffProgress()
      }, 1500)
    } else {
      progressWidth++
      dispatch({
        type: ON_PROGRESS_BAR,
        payload: progressWidth,
      })
    }
  }, 10);
}

export const turnoffProgress = _ => (dispatch, getState) => {
  let {progressWidth} = {...getState().main}
  new Promise(resolve => {
    let id = setInterval(_ => {
      if (progressWidth >= 100) {
        clearInterval(id)
        resolve(progressWidth)
      } else {
        progressWidth++
      }
    }, 10);
  })
  .then(progressWidth => {
      if(progressWidth >= 100){
        dispatch({
          type: OFF_PROGRESS_BAR,
          payload: 'none'
        })
        dispatch({
          type: UPDATE_WIDTH,
          payload: 1,
        })
      }
  })
}

export const updateWidth = (value) => dispatch => {
  dispatch({
    type: UPDATE_WIDTH,
    payload: value
  })
}


export function initializeStore (initialState = InitialState) {
  if(NODE_ENV=="production"){
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  }else{
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  }
}
