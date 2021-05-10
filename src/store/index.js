import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { accountReducer } from './account';

//Reducers

const reducer = combineReducers({
  account: accountReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {};
