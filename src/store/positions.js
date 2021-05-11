import axios from 'axios';

const LOAD_POSITIONS = 'LOAD_POSITIONS';
const REBALANCE_POSITIONS = 'REBALANCE_POSITIONS';

//Create Action Creators & Thunks

const loadPositionsActionCreator = (positions) => {
  return {
    type: LOAD_POSITIONS,
    positions,
  };
};

const loadPositions = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/positions');
    const positions = response.data;
    dispatch(loadPositionsActionCreator(positions));
  };
};

const rebalancePositionsActionCreator = (orders) => {
  return {
    type: REBALANCE_POSITIONS,
    orders,
  };
};

const rebalancePositions = () => {
  return async (dispatch) => {
    const acctResponse = await axios.get('api/account');
    const account = acctResponse.data;
    const { portfolio_value } = account;
    const posResponse = await axios.get('/api/positions');
    const positions = posResponse.data;
    positions.forEach((position) => {
      const {
        tgtPct,
        currPct,
        alpacaData: { symbol },
      } = position;
      const tgtAmt = tgtPct * portfolio_value;
      const currAmt = currPct * portfolio_value;
      const amtToTrade = tgtAmt - currAmt;
      if (amtToTrade > 0) {
        console.log(`Buy $${amtToTrade} of ${symbol}`);
      } else if (amtToTrade < 0) {
        console.log(`Sell $${amtToTrade} of ${symbol}`);
      }
    });
    dispatch(rebalancePositionsActionCreator(positions));
  };
};

//Reducer
const positionsReducer = (state = [], action) => {
  if (action.type === LOAD_POSITIONS) {
    state = action.positions;
  }
  if (action.type === REBALANCE_POSITIONS) {
    state = action.positions;
  }
  return state;
};

export { loadPositions, positionsReducer };
