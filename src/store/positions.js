import axios from 'axios';

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
    const response = await axios.get('/api/positions');
    const positions = response.data;
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
