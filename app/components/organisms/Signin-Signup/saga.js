import axios from 'axios';
import {
  LIB_SIGNIN_REQUEST,
  LIB_SIGNIN_SUCCESS,
  LIB_SIGNUP_REQUEST,
} from './constants';

const { put, all, takeLatest, call } = require('redux-saga/effects');
const {
  libSignupSuccess,
  libSignupFailure,
  libSigninSuccess,
  libSigninFailure,
} = require('./action');

const SERVER_URL = 'https://cap-api-load-tester.onrender.com';

function* signupSaga(action) {
  try {
    const res = yield call(axios.post, `${SERVER_URL}/Signup`, action.payload);
    yield put(libSignupSuccess(res));
    action.callback(res);
  } catch (err) {
    yield put(libSignupFailure(err.response.data));
    action.callback(err.response);
  }
}

function* signinSaga(action) {
  try {
    const res = yield call(axios.post, `${SERVER_URL}/Signin`, action.payload);

    yield put(libSigninSuccess(res.data.resUser));
    action.callback(res);
  } catch (error) {
    yield put(libSigninFailure(error.response.data));
    action.callback(error.response);
  }
}

export function* authSaga() {
  yield takeLatest(LIB_SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LIB_SIGNIN_REQUEST, signinSaga);
}

export default function* rootSaga() {
  yield all([authSaga()]);
}
