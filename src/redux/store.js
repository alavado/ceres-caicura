import { createStore, combineReducers } from 'redux'
import reducers from './ducks'

const store = createStore(combineReducers(reducers))

export default store