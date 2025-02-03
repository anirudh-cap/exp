import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  expenses: [],
  loading: false,
  error: null,
});

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EXPENSE_REQUEST:
      return state.set('loading', true).set('error', null);
      case types.SEARCH_TERM:
        return state.set('error', null);      
    case types.ADD_EXPENSE_SUCCESS:
      return state
        .set('loading', false)
        .update('expenses', expenses => expenses.push(fromJS(action.payload)));
    case types.ADD_EXPENSE_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.FETCH_EXPENSE_REQUEST:
      return state.set('loading', true).set('error', null);
    case types.FETCH_EXPENSE_SUCCESS:
      return state
        .set('loading', false)
        .set('expenses', fromJS(action.payload));
    case types.FETCH_EXPENSE_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.EDIT_EXPENSE_REQUEST:
      return state.set('loading', true).set('error', null);
    case types.EDIT_EXPENSE_SUCCESS:
      return state
        .set('loading', false)
        .update('expenses', expenses =>
          expenses.map(
            expense =>
              expense.get('id') === action.payload.id
                ? fromJS(action.payload)
                : expense,
          ),
        );
    case types.EDIT_EXPENSE_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    case types.DELETE_EXPENSE_REQUEST:
      return state.set('loading', true).set('error', null);
    case types.DELETE_EXPENSE_SUCCESS:
      return state
        .set('loading', false)
        .update('expenses', expenses =>
          expenses.filter(expense => expense.get('id') !== action.payload),
        );
    case types.DELETE_EXPENSE_FAILURE:
      return state.set('loading', false).set('error', action.payload);

    default:
      return state;
  }
};

export default expenseReducer;
