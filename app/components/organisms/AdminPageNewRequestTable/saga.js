import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import * as types from './constants';
import {
  fetchUserNewRequestedBooksSuccess,
  fetchUserNewRequestedBooksFailure,
  cancelUserNewRequestedBooksSuccess,
  cancelUserNewRequestedBooksFailure,
  acceptNewBookRequestSuccess,
  acceptNewBookRequestFailure,
} from './actions';

export function* getBookRequests(action) {
  try {
    const res = yield call(Api.getUserNewRequestedBooks, action.payload);
    if (res?.success) {
      yield put(
        fetchUserNewRequestedBooksSuccess({
          result: res.result,
          count: res.totalRequests,
        }),
      );
    } else {
      yield put(fetchUserNewRequestedBooksFailure(res));
    }
  } catch (error) {
    yield put(fetchUserNewRequestedBooksFailure(error));
  }
}

export function* watchForGetBookRequests() {
  yield takeLatest(types.FETCH_USER_NEW_REQUESTED_BOOKS, getBookRequests);
}

export function* cancelBookRequests(action) {
  try {
    const res = yield call(Api.cancelNewRequest, action.payload);

    if (res?.status == 200) {
      yield put(cancelUserNewRequestedBooksSuccess());
    } else {
      yield put(cancelUserNewRequestedBooksFailure(res.error));
    }
  } catch (error) {
    yield put(cancelUserNewRequestedBooksFailure(error));
  }
}

export function* watchForCancelBookRequests() {
  yield takeLatest(types.CANCEL_USER_NEW_REQUESTED_BOOKS, cancelBookRequests);
}

export function* acceptBookRequests(action) {
  try {
    console.log('********accept saga', action.payload);
    const res = yield call(Api.acceptNewRequest, action.payload);

    if (res?.status == 200) {
      yield put(acceptNewBookRequestSuccess());
    } else {
      yield put(acceptNewBookRequestFailure(res.error));
    }
  } catch (error) {
    yield put(acceptNewBookRequestFailure(error));
  }
}

export function* watchForAcceptBookRequests() {
  yield takeLatest(types.ACCEPT_USER_NEW_BOOK_REQUEST, acceptBookRequests);
}

export default function*() {
  yield all([
    watchForGetBookRequests(),
    watchForCancelBookRequests(),
    watchForAcceptBookRequests(),
  ]);
}
