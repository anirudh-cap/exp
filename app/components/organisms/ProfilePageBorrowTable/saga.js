import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';
import {
  fetchUserBorrowedBooksSuccess,
  fetchUserBorrowedBooksFailure,
  returnUserBorrowedBooksSuccess,
  returnUserBorrowedBooksFailure,
} from './actions';

export function* getBookRequests(action) {
  try {
    const res = yield call(Api.getUserBorrowedBooks, action.payload.userId);
    if (res?.status == 200) {
      yield put(fetchUserBorrowedBooksSuccess(res.data));
    } else {
      yield put(fetchUserBorrowedBooksFailure(res));
    }
  } catch (error) {
    yield put(fetchUserBorrowedBooksFailure(error));
  }
}

export function* watchForGetBookRequests() {
  yield takeLatest(types.FETCH_USER_BORROWED_BOOKS, getBookRequests);
}

export function* returnBookRequests(action) {
  try {
    const res = yield call(
      Api.returnBook,
      action.payload.userId,
      action.payload.bookId,
    );
    if (res?.status == 200) {
      yield put(returnUserBorrowedBooksSuccess());
    } else {
      yield put(returnUserBorrowedBooksFailure(res.error));
    }
  } catch (error) {
    yield put(returnUserBorrowedBooksFailure(error));
  }
}

export function* watchForReturnBookRequests() {
  yield takeLatest(types.RETURN_USER_BORROWED_BOOKS, returnBookRequests);
}

export default function*() {
  yield all([watchForGetBookRequests(), watchForReturnBookRequests()]);
}
