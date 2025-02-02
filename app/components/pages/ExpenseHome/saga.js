import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as types from './constants';

const JsonUrl = "http://localhost:8001/expenses";

function* fetchExpenseSaga() {
    // console.log("inside worker saga");
    try {
        // console.log("inside FetchWorkerSaga");
        const response = yield call(fetch, JsonUrl);
        const data = yield response.json();
        // console.log("data", data);
        yield put({ type: types.FETCH_EXPENSE_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: types.FETCH_EXPENSE_FAILURE, payload: error.message });
    }
}

function* addExpenseRequest(action) {
    console.log("inside addExpenseRequest");
    try {
        const response = yield call(() =>
            fetch(JsonUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(action.payload),
            }).then(res => res.json())
        );
        yield put({ type: types.ADD_EXPENSE_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.ADD_EXPENSE_FAILURE, payload: error });
    }
}

function* editExpenseRequest(action) {
    try {
        const response = yield call(() =>
            fetch(`${JsonUrl}/${action.payload.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(action.payload.updatedData),
            }).then(res => res.json())
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
                method: "DELETE",
            })
        );
        // Dispatch success with the deleted expense id
        yield put({ type: types.DELETE_EXPENSE_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: types.DELETE_EXPENSE_FAILURE, payload: error });
    }
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
    ]);
}

// for delExpenseRequest
// yield call(() =>
//     fetch(`${JsonUrl}/${action.payload}`, {
//         method: "DELETE",
//     })
// );
// // Dispatch success with the deleted expense id
// yield put({ type: types.DELETE_EXPENSE_SUCCESS, payload: action.payload });