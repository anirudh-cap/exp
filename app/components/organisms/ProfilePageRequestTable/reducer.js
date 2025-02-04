import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  userRequestedBooks: [],
  loading: false,
  error: null,
});

export const profilePageRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUESTED_BOOKS:
      return state.set('loading', true);
    case types.FETCH_USER_REQUESTED_BOOKS_SUCCESS:
      return state
        .set('loading', false)
        .set('userRequestedBooks', fromJS(action.payload));
    case types.FETCH_USER_REQUESTED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', fromJS(action.payload));

    case types.CANCEL_USER_REQUESTED_BOOKS:
      return state.set('loading', true);
    case types.CANCEL_USER_REQUESTED_BOOKS_SUCCESS:
      return state.set('loading', false);
    case types.CANCEL_USER_REQUESTED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', fromJS(action.payload));

    default:
      return state;
  }
};
