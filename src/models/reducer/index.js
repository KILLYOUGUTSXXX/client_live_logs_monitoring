import { combineReducers } from 'redux'
// Imports: Reducers
import app from './app'
import loadings from './loadings'

// Redux: Root Reducer
const rootReducer = combineReducers({
  app,
  loadings
})
// Exports
export default rootReducer
