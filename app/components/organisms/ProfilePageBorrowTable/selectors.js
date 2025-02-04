import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';
/**
 * Direct selector to the newBookRequests state domain
 */

const selectUserBorrowedRequestsDetailDomain = (state = fromJS({})) =>
  state.get('profilePageBorrowedReducer', initialState);

/**
 * Default selector used by loyaltyDetail
 */

const makeSelectUserBorrowedBooksDetail = () =>
  createSelector(
    selectUserBorrowedRequestsDetailDomain,
    (substate = fromJS({})) => substate.toJS(),
  );

const makeSelectUserBorrowedBooksData = state =>
  createSelector(
    selectUserBorrowedRequestsDetailDomain,
    (substate = fromJS({})) => ({
      getBooksBorrowed: substate.get('userBorrowedBooks').toJS(),
      getLoading: substate.get('loading'),
      getError: substate.get('error'),
    }),
  );

export {
  makeSelectUserBorrowedBooksDetail,
  selectUserBorrowedRequestsDetailDomain,
  makeSelectUserBorrowedBooksData,
};
