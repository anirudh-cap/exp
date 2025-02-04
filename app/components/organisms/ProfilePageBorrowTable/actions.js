import * as types from './constants';

export const fetchUserBorrowedBooks = data => ({
  type: types.FETCH_USER_BORROWED_BOOKS,
  payload: data,
});

export const fetchUserBorrowedBooksSuccess = data => ({
  type: types.FETCH_USER_BORROWED_BOOKS_SUCCESS,
  payload: data,
});

export const fetchUserBorrowedBooksFailure = data => ({
  type: types.FETCH_USER_BORROWED_BOOKS_FAILURE,
  payload: data,
});

export const returnUserBorrowedBooks = data => ({
  type: types.RETURN_USER_BORROWED_BOOKS,
  payload: data,
});

export const returnUserBorrowedBooksSuccess = () => ({
  type: types.RETURN_USER_BORROWED_BOOKS_SUCCESS,
});

export const returnUserBorrowedBooksFailure = data => ({
  type: types.RETURN_USER_BORROWED_BOOKS_FAILURE,
  payload: data,
});
