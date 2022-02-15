const UPDATE_TOTAL_TARGET_PERCENTAGE = "UPDATE_TOTAL_TARGET_PERCENTAGE";

const updateTotalTargetPercentageActionCreator = (totalTargetPercentage) => {
  return {
    type: UPDATE_TOTAL_TARGET_PERCENTAGE,
    totalTargetPercentage,
  };
};

const totalTargetPercentageReducer = (state = 100, action) => {
  if (action.type === UPDATE_TOTAL_TARGET_PERCENTAGE) {
    state = action.totalTargetPercentage;
  }
  return state;
};

export {
  updateTotalTargetPercentageActionCreator,
  totalTargetPercentageReducer,
};
