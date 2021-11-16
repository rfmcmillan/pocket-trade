import axios from 'axios';

const LOAD_ACCOUNT = 'LOAD_ACCOUNT';

const loadAccountActionCreator = (account) => {
  return {
    type: LOAD_ACCOUNT,
    account,
  };
};

const loadAccount = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/account');
    const account = response.data;

    dispatch(loadAccountActionCreator(account));
  };
};

const accountReducer = (state = [], action) => {
  if (action.type === LOAD_ACCOUNT) {
    state = action.account;
  }
  return state;
};

export { loadAccount, loadAccountActionCreator, accountReducer };
