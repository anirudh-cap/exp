import { fromJS } from 'immutable';
import * as types from './constants';
import bookData from '../../pages/ProfilePage/bookData';

export const initialState = fromJS({
  userNewRequestedBooks: [],
  loading: false,
  error: null,
  totalCount: 0,
});

export const profilePageNewRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_NEW_REQUESTED_BOOKS:
      return state.set('loading', true);
    case types.FETCH_USER_NEW_REQUESTED_BOOKS_SUCCESS:
      // console.log('*****reducer', action.payload.count);
      return state
        .set('loading', false)
        .set('userNewRequestedBooks', fromJS(action.payload.result))
        .set('totalCount', action.payload.count);
    case types.FETCH_USER_NEW_REQUESTED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.CANCEL_USER_NEW_REQUESTED_BOOKS:
      return state.set('loading', true);
    case types.CANCEL_USER_NEW_REQUESTED_BOOKS_SUCCESS:
      return state.set('loading', false);
    case types.CANCEL_USER_NEW_REQUESTED_BOOKS_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.ACCEPT_USER_NEW_BOOK_REQUEST:
      return state.set('loading', true);
    case types.ACCEPT_USER_NEW_BOOK_REQUEST_SUCCESS:
      return state.set('loading', false);
    case types.ACCEPT_USER_NEW_BOOK_REQUEST_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    default:
      return state;
  }
};
