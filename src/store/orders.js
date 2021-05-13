import axios from 'axios';
const LOAD_ORDERS = 'LOAD_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';

const loadOrdersActionCreator = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

const loadOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/orders/all');
    const orders = response.data;
    dispatch(loadOrdersActionCreator(orders));
  };
};

const createOrderActionCreator = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

const createOrder = (symbol, notional, side, type, time_in_force) => {
  return async (dispatch) => {
    const order = (
      await axios.post('/api/orders', {
        symbol,
        notional,
        side,
        type,
        time_in_force,
      })
    ).data;
    dispatch(createOrderActionCreator(order));
  };
};

const ordersReducer = (state = [], action) => {
  if (action.type === LOAD_ORDERS) {
    state = action.orders;
  }
  if (action.type === CREATE_ORDER) {
    state = [...state, action.order];
  }
  return state;
};

export { loadOrders, createOrder, ordersReducer };
