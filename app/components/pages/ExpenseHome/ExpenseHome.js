// ExpenseHome.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  CapRow,
  CapHeading,
  CapInput,
  CapSelect,
} from '@capillarytech/cap-ui-library';
import ExpenseList from '../../organisms/ExpenseList/ExpenseList';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import NavBar from '../../organisms/NavBar/NavBar';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { sortExpenses } from './actions';
import { expenseReducer } from './reducer';
import {
  makeExpensesSelector,
  makeErrorSelector,
  makeLoadingSelector,
} from './selectors';
import { size } from 'lodash';

const ExpenseHome = ({ className, expenses, loading, error, actions }) => {
  const [enteredFilterValue, setEnteredFilterValue] = useState('');

  useEffect(() => {
    actions.fetchExpenseRequest();
  }, []);

  // Calculate totals
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.get('amount'),
    0,
  );
  const balance = 100000 - totalExpenses;

  const handleSearch = event => {
    const value = event.target.value;
    setEnteredFilterValue(value);
    console.log('Search triggered with: ', value);
    actions.searchTerm(value);
  };

  const filteredExpenses = expenses.filter(expense => {
    const name = expense.get('name', ''); // Provide a default empty string
    return name.toLowerCase().includes(enteredFilterValue.toLowerCase());
  });

  const handleSortChange = selectedOption => {
    actions.sortExpenses(selectedOption);
  };

  return (
    <>
      <NavBar />
      {/* Main container now arranges its children in a column and centers them */}
      <CapRow
        style={{
          padding: '0 24px',
          marginTop: 16,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Search Section */}
        <CapRow style={{ width: '100%', marginBottom: 16 }}>
          <CapInput
            placeholder="Search any term"
            onChange={handleSearch}
            value={enteredFilterValue}
            style={{ width: '90%' }}
          />
        </CapRow>

        {/* Filter Section */}
        <CapRow style={{ width: '100%', marginBottom: 16 }}>
          <CapSelect
            options={[
              { label: 'By Amount Asc', value: 'amountAsc' },
              { label: 'By Category Asc', value: 'categoryAsc' },
            ]}
            width="100px"
            defaultValue="Sort By"
            onChange={selected => handleSortChange(selected)}
          />
        </CapRow>

        {/* Centered Balance and Expenses Section */}
        <CapRow
          gap="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <CapHeading type="h4" style={{ color: '#52c41a', fontSize: '20px' }}>
            Balance: ₹{balance}
          </CapHeading>
          <CapHeading type="h4" style={{ color: '#f5222d', fontSize: '20px' }}>
            Expenditure: ₹{totalExpenses}
          </CapHeading>
        </CapRow>

        {/* Expense List Section */}
        <ExpenseList className={className} expense={filteredExpenses} />
      </CapRow>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  expenses: makeExpensesSelector(),
  loading: makeLoadingSelector(),
  error: makeErrorSelector(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  actions: bindActionCreators({ ...actions, sortExpenses }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'expenses', saga });
const withReducer = injectReducer({ key: 'expenses', reducer: expenseReducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ExpenseHome);
