import axios from 'axios';

const LOAD_ACCOUNT = 'LOAD_ACCOUNT';

//Create Action Creators & Thunks

const loadAccountActionCreator = (account) => {
  return {
    type: LOAD_ACCOUNT,
    account,
  };
};

const loadAccount = () => {
  return async (dispatch) => {
    const account = await axios.get('/account');
    console.log(account);
    dispatch(loadAccountActionCreator(account));
  };
};

//Update User Action Creator and Thunk
// const updateUserActionCreator = (user) => {
//   return {
//     type: UPDATE_USER,
//     user,
//   };
// };

// const updateUser = (user, history) => {
//   let { id, firstName, lastName, email, admin, password } = user;
//   return async (dispatch) => {
//     const userToUpdate = (
//       await axios.put(`/api/users/${id}`, {
//         firstName,
//         lastName,
//         email,
//         admin,
//         password,
//       })
//     ).data;
//     const updated = {
//       id: userToUpdate.id,
//       email: userToUpdate.email,
//       cart: userToUpdate.car,
//       firstName: userToUpdate.firstName,
//       lastName: userToUpdate.lastName,
//       admin: userToUpdate.admin,
//     };

//     dispatch(updateUserActionCreator(updated));
//   };
// };

//Reducer
const accountReducer = (state = [], action) => {
  if (action.type === LOAD_ACCOUNT) {
    state = action.account;
  }
  // if (action.type === UPDATE_USER) {
  //   const users = state.map((user) => {
  //     if (user.id === action.user.id) {
  //       return action.user;
  //     }
  //     return user;
  //   });
  //   state = users;
  // }
  return state;
};

export {
  loadAccount,
  // updateUserActionCreator,
  // updateUser,
  accountReducer,
};
