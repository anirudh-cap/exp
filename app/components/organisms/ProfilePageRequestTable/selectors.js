import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';
/**
 * Direct selector to the newBookRequests state domain
 */

const selectUserBookRequestsDetailDomain = (state = fromJS({})) =>
  state.get('userRequest', initialState);

/**
 * Default selector used by loyaltyDetail
 */

const makeSelectUserBookRequestsDetail = () =>
  createSelector(selectUserBookRequestsDetailDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

const makeSelectUserBookRequestsData = () =>
  createSelector(
    selectUserBookRequestsDetailDomain,
    (substate = fromJS({})) => ({
      getBookRequests: substate.get('userRequestedBooks').toJS(),
      getLoading: substate.get('loading'),
      getError: substate.get('error'),
    }),
  );

export {
  makeSelectUserBookRequestsDetail,
  selectUserBookRequestsDetailDomain,
  makeSelectUserBookRequestsData,
};
