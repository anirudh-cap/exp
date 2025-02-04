import {
  LIB_SIGNIN_FAILURE,
  LIB_SIGNIN_REQUEST,
  LIB_SIGNIN_SUCCESS,
  LIB_SIGNUP_FAILURE,
  LIB_SIGNUP_REQUEST,
  LIB_SIGNUP_SUCCESS,
} from './constants';

export const libSignupRequest = (
  { username, useremail, userpassword },
  callback,
) => ({
  type: LIB_SIGNUP_REQUEST,
  payload: { username, useremail, userpassword },
  callback,
});

export const libSignupSuccess = (res, callback) => ({
  type: LIB_SIGNUP_SUCCESS,
  payload: { res },
  callback,
});

export const libSignupFailure = (error, callback) => ({
  type: LIB_SIGNUP_FAILURE,
  payload: { error },
  callback,
});

export const libSigninRequest = ({ email, password }, callback) => ({
  type: LIB_SIGNIN_REQUEST,
  payload: { email, password },
  callback,
});

export const libSigninSuccess = (user, callback) => ({
  type: LIB_SIGNIN_SUCCESS,
  payload: { user },
  callback,
});

export const libSigninFailure = (error, callback) => ({
  type: LIB_SIGNIN_FAILURE,
  payload: { error },
  callback,
});
