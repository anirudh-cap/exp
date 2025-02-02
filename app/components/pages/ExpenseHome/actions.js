import {
    ADD_EXPENSE_REQUEST,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_FAILURE,
    DELETE_EXPENSE_REQUEST,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAILURE,
    SORT_EXPENSES_BY_CATEGORY,
    FETCH_EXPENSE_REQUEST,
    FETCH_EXPENSE_SUCCESS,
    FETCH_EXPENSE_FAILURE,
    EDIT_EXPENSE_REQUEST,
    EDIT_EXPENSE_SUCCESS,
    EDIT_EXPENSE_FAILURE,
    SET_LOADING,
    FILTERED_BY_MONTH,
} from "./constants";

export const addExpenseRequest = (expense) => ({
    type: ADD_EXPENSE_REQUEST,
    payload: expense,
});

export const addExpenseSuccess = (expense) => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: expense,
});

export const addExpenseFailure = (error) => ({
    type: ADD_EXPENSE_FAILURE,
    payload: error,
});

export const deleteExpenseRequest = (id) => ({
    type: DELETE_EXPENSE_REQUEST,
    payload: id,
});

export const deleteExpenseSuccess = (id) => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload: id,
});

export const deleteExpenseFailure = (error) => ({
    type: DELETE_EXPENSE_FAILURE,
    payload: error,
});

export const fetchExpenseRequest = () => ({
    type: FETCH_EXPENSE_REQUEST,
});

export const fetchExpenseSuccess = (expenses) => ({
    type: FETCH_EXPENSE_SUCCESS,
    payload: expenses,
});

export const fetchExpenseFailure = (error) => ({
    type: FETCH_EXPENSE_FAILURE,
    payload: error,
});

export const editExpenseRequest = (id, updatedData) => ({
    type: EDIT_EXPENSE_REQUEST,
    payload: { id, updatedData },
});

export const editExpenseSuccess = (updatedData) => ({
    type: EDIT_EXPENSE_SUCCESS,
    payload: updatedData,
});

export const editExpenseFailure = (error) => ({
    type: EDIT_EXPENSE_FAILURE,
    payload: error,
});

export const sortByCategory = (category) => ({
    type: SORT_EXPENSES_BY_CATEGORY,
    payload: category,
});

export const filterByMonth = (month) => ({
    type: FILTERED_BY_MONTH,
    payload: month,
});