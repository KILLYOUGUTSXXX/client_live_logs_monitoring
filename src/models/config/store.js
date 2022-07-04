import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'

import rootReducer from '../reducer/index'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  blacklist: []
}
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    // createLogger(),
    thunk
  ),
)

let persistor = persistStore(store)
export {
  store,
  persistor
}
