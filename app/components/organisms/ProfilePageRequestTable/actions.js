import * as types from './constants';

export const fetchUserRequestedBooks = data => ({
  type: types.FETCH_USER_REQUESTED_BOOKS,
  payload: data,
});

export const fetchUserRequestedBooksSuccess = data => ({
  type: types.FETCH_USER_REQUESTED_BOOKS_SUCCESS,
  payload: data,
});

export const fetchUserRequestedBooksFailure = data => ({
  type: types.FETCH_USER_REQUESTED_BOOKS_FAILURE,
  payload: data,
});

export const cancelUserRequestedBooks = data => ({
  type: types.CANCEL_USER_REQUESTED_BOOKS,
  payload: data,
});

export const cancelUserRequestedBooksSuccess = () => ({
  type: types.CANCEL_USER_REQUESTED_BOOKS_SUCCESS,
});

export const cancelUserRequestedBooksFailure = data => ({
  type: types.CANCEL_USER_REQUESTED_BOOKS_FAILURE,
  payload: data,
});
