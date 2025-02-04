import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_ALL_BOOKLIST, ISSUE_BOOK, RESERVE_BOOK } from './constant';
import {
  fetchBookListSuccess,
  fetchBookListFailed,
  setLoadingState,
  issueBookSuccess,
  issueBookFailure,
  reserveBookSuccess,
  reserveBookFailure,
} from './actions';
import {
  showSuccessNotifiction,
  showErrorNotifiction,
} from '../../../services/notification';
import { getBookList, issueBook, requestBook } from '../../../services/api';

export function* getBookListSaga(action) {
  try {
    yield put(setLoadingState(true));
    const res = yield call(getBookList, action.payload);

    if (!res.result) {
      yield put(setLoadingState(false));
      yield put(fetchBookListFailed(res));
    } else {
      yield put(fetchBookListSuccess(res));
      yield put(setLoadingState(false));
    }
  } catch (e) {
    yield put(setLoadingState(false));
    yield put(fetchBookListFailed(e));
  }
}

export function* issueBookSaga(action) {
  try {
    yield put(setLoadingState(true));
    const updatedBook = yield call(issueBook, action.payload);
    yield put(issueBookSuccess(updatedBook)); //write api calls
    showSuccessNotifiction('Book is issued successfully!');
    yield put(setLoadingState(false));
  } catch (e) {
    showErrorNotifiction('Some error occured');
    yield put(setLoadingState(false));
    yield put(issueBookFailure(e));
  }
}

export function* reserveBookSaga(action) {
  try {
    const updatedBook = yield call(requestBook, action.payload);
    yield put(setLoadingState(true));
    yield put(reserveBookSuccess(updatedBook));
    showSuccessNotifiction('Book is reserved successfully!');
    yield put(setLoadingState(false));
  } catch (e) {
    showErrorNotifiction('Some error occured');
    yield put(setLoadingState(false));
    yield put(reserveBookFailure(e));
  }
}

export function* watchForBookListSaga() {
  yield takeLatest(FETCH_ALL_BOOKLIST, getBookListSaga);
  yield takeLatest(ISSUE_BOOK, issueBookSaga);
  yield takeLatest(RESERVE_BOOK, reserveBookSaga);
}
