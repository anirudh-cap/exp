import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';
import {
  fetchUserRequestedBooksSuccess,
  fetchUserRequestedBooksFailure,
  cancelUserRequestedBooksSuccess,
  cancelUserRequestedBooksFailure,
} from './actions';

export function* getBookRequests(action) {
  try {
    const res = yield call(Api.getUserRequestedBooks, action.payload.userId);
    if (res?.status == 200) {
      yield put(fetchUserRequestedBooksSuccess(res.data));
    } else {
      yield put(fetchUserRequestedBooksFailure(res.error));
    }
  } catch (error) {
    yield put(fetchUserRequestedBooksFailure(error));
  }
}

export function* watchForGetBookRequests() {
  yield takeLatest(types.FETCH_USER_REQUESTED_BOOKS, getBookRequests);
}

export function* cancelBookRequests(action) {
  try {
    const res = yield call(
      Api.cancelUserRequests,
      action.payload.userId,
      action.payload.bookId,
    );

    if (res?.status == 200) {
      yield put(cancelUserRequestedBooksSuccess());
    } else {
      yield put(cancelUserRequestedBooksFailure(res.error));
    }
  } catch (error) {
    yield put(cancelUserRequestedBooksFailure(error));
  }
}

export function* watchForReturnBookRequests() {
  yield takeLatest(types.CANCEL_USER_REQUESTED_BOOKS, cancelBookRequests);
}

export default function*() {
  yield all([watchForGetBookRequests(), watchForReturnBookRequests()]);
}
