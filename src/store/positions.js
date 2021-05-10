import axios from 'axios';
import { api_key, api_secret } from '../../env.js';

const LOAD_POSITIONS = 'LOAD_POSITIONS';

//Create Action Creators & Thunks

const loadPositionsActionCreator = (positions) => {
  return {
    type: LOAD_POSITIONS,
    positions,
  };
};

const loadPositions = () => {
  return async (dispatch) => {
    const response = await axios.get(
      'https://api.alpaca.markets/v2/positions',
      {
        headers: {
          'APCA-API-KEY-ID': api_key,
          'APCA-API-SECRET-KEY': api_secret,
        },
      }
    );

    const positions = response.data;
    console.log('positions:', positions);

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
