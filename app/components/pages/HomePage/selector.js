import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const selectBookList = (state = fromJS({})) => state.get('bookList');

const makeAllBookListSelector = () =>
  createSelector(selectBookList, (substate = fromJS({})) =>
    substate.get('allBookList'),
  );

const makeTotalBooksSelctor = () =>
  createSelector(selectBookList, (substate = fromJS({})) =>
    substate.get('totalBooks'),
  );

const makeLoadingState = () =>
  createSelector(selectBookList, (substate = fromJS({})) =>
    substate.get('isLoading'),
  );

export { makeAllBookListSelector, makeTotalBooksSelctor, makeLoadingState };
