import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';
/**
 * Direct selector to the newBookRequests state domain
 */

const selectUserNewBookRequestsDetailDomain = (state = fromJS({})) =>
  state.get('profilePageNewRequest', initialState);

/**
 * Default selector used by loyaltyDetail
 */

const makeSelectUserNewBookRequestsDetail = () =>
  createSelector(
    selectUserNewBookRequestsDetailDomain,
    (substate = fromJS({})) => substate.toJS(),
  );

const makeSelectUserNewBookRequestsData = () =>
  createSelector(
    selectUserNewBookRequestsDetailDomain,
    (substate = fromJS({})) => ({
      getBookRequests: substate.get('userNewRequestedBooks').toJS(),
      getLoading: substate.get('loading'),
      getError: substate.get('error'),
      getCount: substate.get('totalCount'),
    }),
  );

export {
  makeSelectUserNewBookRequestsDetail,
  selectUserNewBookRequestsDetailDomain,
  makeSelectUserNewBookRequestsData,
};
