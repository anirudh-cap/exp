import { fromJS } from 'immutable';
import initialState from './initialState';

const {
  LIB_SIGNUP_REQUEST,
  LIB_SIGNUP_FAILURE,
  LIB_SIGNIN_REQUEST,
  LIB_SIGNIN_SUCCESS,
  LIB_SIGNIN_FAILURE,
  LIB_SIGNUP_SUCCESS,
} = require('./constants');

// export const initialState = fromJS({
//   user: {},
//   error: null,
// });
const authReducer = (state = fromJS(initialState.libraryData), action) => {
  switch (action.type) {
    case LIB_SIGNUP_REQUEST:
      return state.set('error', null);

    case LIB_SIGNUP_SUCCESS:
      return state;

    case LIB_SIGNUP_FAILURE:
      return state.set('error', action.payload.error);

    case LIB_SIGNIN_REQUEST:
      return state.set('error', null);

    case LIB_SIGNIN_SUCCESS:
      return state.set('user', fromJS(action.payload.user)).set('error', null);

    case LIB_SIGNIN_FAILURE:
      return state.set('error', action.payload.error);
    default:
      return state;
  }
};

export default authReducer;
