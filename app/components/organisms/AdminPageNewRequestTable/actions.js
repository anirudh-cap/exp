import * as types from './constants';

export const fetchUserNewRequestedBooks = data => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS,
  payload: data,
});

export const fetchUserNewRequestedBooksSuccess = data => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS_SUCCESS,
  payload: data,
});

export const fetchUserNewRequestedBooksFailure = data => ({
  type: types.FETCH_USER_NEW_REQUESTED_BOOKS_FAILURE,
  payload: data,
});

export const cancelUserNewRequestedBooks = data => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS,
  payload: data,
});

export const cancelUserNewRequestedBooksSuccess = () => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS_SUCCESS,
});

export const cancelUserNewRequestedBooksFailure = data => ({
  type: types.CANCEL_USER_NEW_REQUESTED_BOOKS_FAILURE,
  payload: data,
});

export const acceptNewBookRequest = data =>
  // console.log("******actions",data);
  ({
    type: types.ACCEPT_USER_NEW_BOOK_REQUEST,
    payload: data,
  });

export const acceptNewBookRequestSuccess = () => ({
  type: types.ACCEPT_USER_NEW_BOOK_REQUEST_SUCCESS,
});

export const acceptNewBookRequestFailure = data => ({
  type: types.ACCEPT_USER_NEW_BOOK_REQUEST_FAILURE,
  payload: data,
});
