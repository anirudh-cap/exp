import * as types from "./constants";
import { fromJS } from "immutable";

export const initialState = fromJS({
    expenses: [],
    loading: false,
    error: null,
    // filteredExpenses: [],
    // sortCategory: "",
    // filterByMonth: "",
});

export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_EXPENSE_REQUEST:
            return state.set('loading', true).set('error', action.error);
        case types.ADD_EXPENSE_SUCCESS:
            return state.set('loading', false).set('expenses', action.payload); 
        case types.ADD_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.error);

        case types.FETCH_EXPENSE_REQUEST:
            return state.set('loading', true).set('error', action.error);
        case types.FETCH_EXPENSE_SUCCESS:
            return state.set('loading', false).set('expenses', action.payload);
        case types.FETCH_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.error);

        case types.EDIT_EXPENSE_REQUEST:
            return  state.set('loading', true).set('error', action.error);
        case types.EDIT_EXPENSE_SUCCESS:
            return state.update('expenses', expenses =>
                expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                )
            );
        case types.EDIT_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.error);

        case types.DELETE_EXPENSE_REQUEST:
            return state.set('loading', true).set('error', action.error);
        case types.DELETE_EXPENSE_SUCCESS:
            return state.update('expenses', expenses => expenses.filter(expense => expense.get('id') !== action.payload));
            
        case types.DELETE_EXPENSE_FAILURE:
            return state.set('loading', false).set('error', action.error);

        // case types.SORT_EXPENSES_BY_CATEGORY:
        //     return state.set('sortCategory', action.payload).update('filteredExpenses', expenses => (
        //         state.expenses.filter(exp => exp.category === action.payload)
        //     ));
        // case types.FILTERED_BY_MONTH:
        //     return (state.set('filterByMonth', action.payload).update('filteredExpenses', expenses => (
        //         state.expenses.filter(exp => exp.date.startsWith(action.payload))
        //     )));
           
        default:
            return state;
    }
};

export default expenseReducer;