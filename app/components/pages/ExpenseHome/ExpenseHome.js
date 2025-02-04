import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  CapRow,
  CapHeading,
  CapInput,
  CapSelect,
  CapButton,
  CapModal,
} from '@capillarytech/cap-ui-library';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ExpenseList from '../../organisms/ExpenseList/ExpenseList';
import saga from './saga';
import reducer from './reducer';
import NavBar from '../../organisms/NavBar/NavBar';
import * as actions from './actions';
import { sortExpenses } from './actions';
import { expenseReducer } from './reducer';
import {
  makeExpensesSelector,
  makeErrorSelector,
  makeLoadingSelector,
} from './selectors';

const ExpenseHome = ({ className, expenses, loading, error, actions }) => {
  const [enteredFilterValue, setEnteredFilterValue] = useState('');
  const [balance, setBalance] = useState(0);
  const [tempBalance, setTempBalance] = useState('');

  // State for add expense modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  useEffect(() => {
    actions.fetchExpenseRequest();
  }, []);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount || 0),
    0
  );
  
  const remainingBalance = balance - totalExpenses;

  const handleBalanceChange = event => setTempBalance(event.target.value);
  const handleBalanceUpdate = () => setBalance(Number(tempBalance));
  const handleBalanceReset = () => {
    setBalance(0);
    setTempBalance('');
  };

  const handleSearch = event => {
    const value = event.target.value;
    setEnteredFilterValue(value);
    actions.searchTerm(value);
  };

  const filteredExpenses = expenses.filter(expense =>
    (expense.name || '')
      .toLowerCase()
      .includes(enteredFilterValue.toLowerCase())
  );
  

  const handleSortChange = selectedOption => {
    actions.sortExpenses(selectedOption);
  };

  // Handle Add Expense Modal
  const handleAddExpense = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSubmit = () => {
    const newExpense = {
      description: expenseName,
      amount: parseFloat(expenseAmount),
      date: expenseDate,
      category: expenseCategory,
    };

    actions.addExpenseRequest(newExpense);

    // Reset fields and close modal
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate('');
    setExpenseCategory('');
    setIsModalVisible(false);
  };

  return (
    <>
      <NavBar />
      <CapRow
        style={{
          padding: '0 24px',
          marginTop: 16,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Balance Input Section */}
        <CapRow
          style={{
            width: '100%',
            marginBottom: 16,
            alignItems: 'center',
            justifyContent: 'flex-start',
            display: 'flex',
          }}
        >
          <CapInput
            placeholder="Enter your Balance"
            onChange={handleBalanceChange}
            value={tempBalance}
            style={{ width: '1280px', marginRight: '10px' }}
          />
          <CapButton onClick={handleBalanceUpdate}>Update</CapButton>
          <CapButton style={{ margin: '10px' }} onClick={handleBalanceReset}>
            Reset
          </CapButton>
        </CapRow>

        {/* Balance & Expenses Summary */}
        <CapRow
          gap="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
          type="flex"
        >
          <CapHeading type="h4" style={{ color: '#52c41a', fontSize: '25px' }}>
            BALANCE: ₹{remainingBalance}
          </CapHeading>
          <CapHeading
            type="h4"
            style={{ marginLeft: '10px', color: '#f5222d', fontSize: '25px' }}
          >
            EXPENDITURE: ₹{totalExpenses}
          </CapHeading>
        </CapRow>

        {/* Search Section */}
        <CapRow style={{ width: '100%', marginBottom: 16 }} type="flex">
          <CapButton
            type="primary"
            onClick={handleAddExpense}
            style={{ marginBottom: 16, marginRight: '12px' }}
          >
            Add Expense
          </CapButton>

          <CapInput
            placeholder="Search any term"
            onChange={handleSearch}
            value={enteredFilterValue}
            style={{ width: '1221px', marginRight: '12px' }}
          />
          <CapSelect
            options={[
              { label: 'By Amount Asc', value: 'amountAsc' },
              { label: 'By Category Asc', value: 'categoryAsc' },
            ]}
            width="100px"
            defaultValue="Sort By"
            onChange={handleSortChange}
          />
        </CapRow>

        {/* Add Expense Modal */}
        <CapModal
          title="Add Expense"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <CapButton key="cancel" onClick={handleCancel}>
              Cancel
            </CapButton>,
            <CapButton key="submit" type="primary" onClick={handleSubmit}>
              Submit
            </CapButton>,
          ]}
        >
          <CapInput
            label="Expense Name"
            value={expenseName}
            onChange={e => setExpenseName(e.target.value)}
            required
            style={{ marginBottom: 8 }}
          />
          <CapInput
            label="Amount"
            type="number"
            value={expenseAmount}
            onChange={e => setExpenseAmount(e.target.value)}
            required
            style={{ marginBottom: 8 }}
          />
          <CapInput
            label="Date"
            type="date"
            value={expenseDate}
            onChange={e => setExpenseDate(e.target.value)}
            required
            style={{ marginBottom: 8 }}
          />
          <CapSelect
            label="Category"
            value={expenseCategory}
            onChange={value => setExpenseCategory(value)}
            options={[
              { label: 'Food', value: 'Food' },
              { label: 'Utilities', value: 'Utilities' },
              { label: 'Transport', value: 'Transport' },
              { label: 'Entertainment', value: 'Entertainment' },
            ]}
            required
            style={{ marginBottom: 8 }}
          />
        </CapModal>

        {/* Expense List Section */}
        <ExpenseList className={className} expenses={filteredExpenses} />
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
