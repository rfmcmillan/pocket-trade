import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { accountReducer } from './account';
import { positionsReducer } from './positions';
import { ordersReducer } from './orders';

const reducer = combineReducers({
  account: accountReducer,
  positions: positionsReducer,
  orders: ordersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {};
