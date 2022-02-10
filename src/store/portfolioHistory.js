import axios from "axios";
const LOAD_PORTFOLIO_HISTORY = "LOAD_PORTFOLIO_HISTORY";

const loadPortfolioHistoryActionCreator = (portfolioHistory) => {
  return {
    type: LOAD_PORTFOLIO_HISTORY,
    portfolioHistory,
  };
};

const loadPortfolioHistory = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/portfolio/history");
    const portfolioHistory = response.data;
    console.log(
      "🚀 ~ file: portfolioHistory.js ~ line 15 ~ return ~ portfolioHistory",
      portfolioHistory
    );
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
