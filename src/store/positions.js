import axios from 'axios';
import { api_key, api_secret } from '../../env.js';

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

const rebalancePositionsActionCreator = (positions) => {
  return {
    type: REBALANCE_POSITIONS,
    positions,
  };
};

const rebalancePositions = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/positions');
    const positions = response.data;
    positions.forEach((position) => {
      const { targAllocation, currAllocation } = position;
    });
    dispatch(loadPositionsActionCreator(positions));
  };
};

//Reducer
const positionsReducer = (state = [], action) => {
  if (action.type === LOAD_POSITIONS) {
    state = action.positions;
  }
  return state;
};

export { loadPositions, positionsReducer };
