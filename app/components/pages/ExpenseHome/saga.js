import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as types from './constants';

const JsonUrl = 'http://localhost:8001/expenses';
const JsonUrlSearch = 'http://localhost:8001/expenses?q=';

function* fetchExpenseSaga() {
  try {
    const response = yield call(fetch, JsonUrl);
    const data = yield response.json();
    yield put({ type: types.FETCH_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.FETCH_EXPENSE_FAILURE, payload: error.message });
  }
}

function* addExpenseRequest(action) {
    try {
      // Fetch the existing expenses first
      const response = yield call(fetch, JsonUrl);
      const expenses = yield response.json();
  
      // Find the highest existing ID and increment it
      const maxId = expenses.length > 0 ? Math.max(...expenses.map(exp => parseInt(exp.id, 10))) : 0;
      const newId = (maxId + 1).toString(); // Convert back to string if needed
  
      // Create the new expense with the incremented ID
      const newExpense = { ...action.payload, id: newId };
  
      // Send the new expense to the API
      const postResponse = yield call(() =>
        fetch(JsonUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newExpense),
        }).then(res => res.json())
      );
  
      // Dispatch success action with the updated expense
      yield put({ type: types.ADD_EXPENSE_SUCCESS, payload: postResponse });
    } catch (error) {
      yield put({ type: types.ADD_EXPENSE_FAILURE, payload: error.message });
    }
  }
  

function* editExpenseRequest(action) {
  try {
    const response = yield call(() =>
      fetch(`${JsonUrl}/${action.payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload.updatedData),
      }).then(res => res.json()),
    );
    yield put({ type: types.EDIT_EXPENSE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.EDIT_EXPENSE_FAILURE, payload: error });
  }
}

function* delExpenseRequest(action) {
  try {
    yield call(() =>
      fetch(`${JsonUrl}/${action.payload}`, {
        method: 'DELETE',
      }),
    );
    yield put({ type: types.DELETE_EXPENSE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: types.DELETE_EXPENSE_FAILURE, payload: error });
  }
}

function* searchTerm(action) {
  try {
    const response = yield call(fetch, `${JsonUrlSearch}${action.payload}`);
    const data = yield response.json();
    
    console.log("searchTerm is called", data);

    yield put({ type: types.FETCH_EXPENSE_SUCCESS, payload: data }); // FIX HERE
  } catch (error) {
    yield put({ type: types.FETCH_EXPENSE_FAILURE, payload: error.message });
  }
}

export function* watchSearchTermeRequests() {
  yield takeLatest(types.SEARCH_TERM, searchTerm);
}

export function* watchAddExpenseRequests() {
  yield takeLatest(types.ADD_EXPENSE_REQUEST, addExpenseRequest);
}

export function* watchDeleteExpenseRequests() {
  yield takeLatest(types.DELETE_EXPENSE_REQUEST, delExpenseRequest);
}

export function* watchFetchExpenseRequests() {
  yield takeLatest(types.FETCH_EXPENSE_REQUEST, fetchExpenseSaga);
}

export function* watchEditExpenseRequests() {
  yield takeLatest(types.EDIT_EXPENSE_REQUEST, editExpenseRequest);
}

export default function*() {
  yield all([
    watchAddExpenseRequests(),
    watchDeleteExpenseRequests(),
    watchFetchExpenseRequests(),
    watchEditExpenseRequests(),
    watchSearchTermeRequests(),
  ]);
}
