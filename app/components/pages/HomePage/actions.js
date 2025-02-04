import * as types from './constant';

export const fetchBookList = (payload = {}) => ({
  type: types.FETCH_ALL_BOOKLIST,
  payload,
});

export const fetchBookListSuccess = result => ({
  type: types.FETCH_ALL_BOOKLIST_SUCCESS,
  result,
});

export const fetchBookListFailed = error => ({
  type: types.FETCH_ALL_BOOKLIST_FAILED,
  error,
});

export const setLoadingState = loadingState => ({
  type: types.SET_LOADING_STATE,
  loadingState,
});

export const issueBook = payload => ({
  type: types.ISSUE_BOOK,
  payload,
});

export const issueBookSuccess = result => ({
  type: types.ISSUE_BOOK_SUCCESS,
  result,
});

export const issueBookFailure = error => ({
  type: types.ISSUE_BOOK_FAILURE,
  error,
});

export const cancelIssueBook = payload => ({
  type: types.CANCEL_ISSUE_BOOK,
  payload,
});

export const reserveBook = payload => ({
  type: types.RESERVE_BOOK,
  payload,
});

export const reserveBookSuccess = result => ({
  type: types.RESERVE_BOOK_SUCCESS,
  result,
});

export const reserveBookFailure = error => ({
  type: types.RESERVE_BOOK_FAILURE,
  error,
});
