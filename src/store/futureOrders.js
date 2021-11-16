import axios from 'axios';
const CREATE_ORDER = 'CREATE_FUTURE_ORDER';
const LOAD_FUTURE_ORDERS = 'LOAD_FUTURE_ORDERS';

const loadFutureOrdersActionCreator = (futureOrders) => {
  return {
    type: LOAD_FUTURE_ORDERS,
    futureOrders,
  };
};

const loadFutureOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/futureOrders');
    const futureOrders = response.data;
    dispatch(loadOrdersActionCreator(futureOrders));
  };
};

const createOrderActionCreator = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

const createFutureOrder = (monthFrequency) => {
  return async (dispatch) => {
    const futureOrder = (
      await axios.post('/api/futureOrders', {
        monthFrequency,
      })
    ).data;
    dispatch(createFutureOrderActionCreator(futureOrder));
  };
};

const futureOrdersReducer = (state = [], action) => {
  if (action.type === LOAD_FUTURE_ORDERS) {
    state = action.futureOrders;
  }
  if (action.type === CREATE_FUTURE_ORDER) {
    state = [...state, action.futureOrder];
  }
  return state;
};

export { loadFutureOrders, createFutureOrder, futureOrdersReducer };
