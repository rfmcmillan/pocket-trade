import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { accountReducer } from "./account";
import { positionsReducer } from "./positions";
import { ordersReducer } from "./orders";
import { portfolioHistoryReducer } from "./portfolioHistory";
import { totalTargetPercentageReducer } from "./totalTargetPercentage";

const logger = createLogger({
  collapsed: true,
});

const reducer = combineReducers({
  account: accountReducer,
  positions: positionsReducer,
  orders: ordersReducer,
  portfolioHistory: portfolioHistoryReducer,
  totalTargetPercentage: totalTargetPercentageReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {};
