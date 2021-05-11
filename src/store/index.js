import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { accountReducer } from './account';
import { positionsReducer } from './positions';

//Reducers

const reducer = combineReducers({
  account: accountReducer,
  positions: positionsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {};
