import axios from "axios";
const LOAD_PORTFOLIO_HISTORY = "LOAD_PORTFOLIO_HISTORY";

const loadPortfolioHistoryActionCreator = (orders) => {
  return {
    type: LOAD_PORTFOLIO_HISTORY,
    orders,
  };
};

const loadPortfolioHistory = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/portfolioHistory");
    const portfolioHistory = response.data;
    dispatch(loadPortfolioHistoryActionCreator(portfolioHistory));
  };
};

const portfolioHistoryReducer = (state = [], action) => {
  if (action.type === LOAD_PORTFOLIO_HISTORY) {
    state = action.portfolioHistory;
  }
  return state;
};

export { loadPortfolioHistory, portfolioHistoryReducer };
