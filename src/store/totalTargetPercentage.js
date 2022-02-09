import axios from "axios";

const LOAD_TOTAL_TARGET_PERCENTAGE = "LOAD_TOTAL_TARGET_PERCENTAGE";
const UPDATE_TOTAL_TARGET_PERCENTAGE = "UPDATE_TOTAL_TARGET_PERCENTAGE";

const loadTotalTargetPercentageActionCreator = (totalTargetPercentage) => {
  return {
    type: LOAD_TOTAL_TARGET_PERCENTAGE,
    totalTargetPercentage,
  };
};

const updateTotalTargetPercentageActionCreator = (totalTargetPercentage) => {
  return {
    type: UPDATE_TOTAL_TARGET_PERCENTAGE,
    totalTargetPercentage,
  };
};

const totalTargetPercentageReducer = (state = 0, action) => {
  if (action.type === UPDATE_TOTAL_TARGET_PERCENTAGE) {
    state = action.totalTargetPercentage;
  }
  return state;
};

export {
  loadTotalTargetPercentageActionCreator,
  updateTotalTargetPercentageActionCreator,
  totalTargetPercentageReducer,
};
