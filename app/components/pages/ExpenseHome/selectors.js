import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { initialState } from './reducer';

const selectExpenses = (state = fromJS({})) => state.get("expenses", initialState);

const makeExpensesSelector = () =>
    createSelector(selectExpenses, (substate = fromJS({})) => 
        substate.get("expenses"),
    );
const makeLoadingSelector = () => 
    createSelector(selectExpenses, (substate = fromJS({})) =>
      substate.get("loading"),
    );
const makeErrorSelector = () =>
    createSelector(selectExpenses, (substate = fromJS({})) =>
        substate.get("error"),
    );

export {
    makeExpensesSelector,
    makeLoadingSelector,
    makeErrorSelector,
};
