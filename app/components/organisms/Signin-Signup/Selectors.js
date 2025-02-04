import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import initialState from './initialState';
const { libraryData } = initialState;
/**
 * Direct selector to the newBookRequests state domain
 */
const selectUserDomain = (state = fromJS({})) =>
  state.get('libraryData', libraryData);
/**
 * Default selector used by loyaltyDetail
 */
const makeSelectUser = () =>
  createSelector(selectUserDomain, (substate = fromJS({})) => substate.toJS());

const makeSelectUserData = () =>
  createSelector(selectUserDomain, (substate = fromJS({})) => ({
    getUser: substate.user,
    getError: substate.error,
  }));
export { makeSelectUser, selectUserDomain, makeSelectUserData };
