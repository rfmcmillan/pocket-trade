import axios from "axios";

const LOAD_POSITIONS = "LOAD_POSITIONS";
const UPDATE_POSITION = "UPDATE_POSITION";

const loadPositionsActionCreator = (positions) => {
  return {
    type: LOAD_POSITIONS,
    positions,
  };
};

const loadPositions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/positions");
      const positions = response.data;

      dispatch(loadPositionsActionCreator(positions));
    } catch (error) {
      console.error(error);
    }
  };
};

const updatePositionActionCreator = (position) => {
  return {
    type: UPDATE_POSITION,
    position,
  };
};

const updatePosition = (id, tgtPct) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`api/positions/${id}`, {
        tgtPct,
      });
      const position = response.data;
      dispatch(updatePositionActionCreator(position));
    } catch (error) {
      console.error(error);
    }
  };
};

const positionsReducer = (state = [], action) => {
  if (action.type === LOAD_POSITIONS) {
    state = action.positions;
  }
  if (action.type === UPDATE_POSITION) {
    const positions = state.map((position) => {
      if (position.id === action.position.id) {
        return action.position;
      }
      return position;
    });
    state = positions;
  }
  return state;
};

export { loadPositions, updatePosition, positionsReducer };
