import React from 'react';
import { connect } from 'react-redux';
import { CapHeading, CapButton } from '@capillarytech/cap-ui-library';
import { Table } from 'antd';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../../pages/ExpenseHome/actions';
import {
  makeExpensesSelector,
  makeLoadingSelector,
  makeErrorSelector,
} from '../../pages/ExpenseHome/selectors';

const ExpenseList = ({ className, expenses, loading, error, actions }) => {
  const handleRemove = key => {
    actions.deleteExpenseRequest(key);
  };

  // Convert Immutable.js List to plain JavaScript array
  const expensesData = expenses.toJS ? expenses.toJS() : expenses;

  const columns = [
    {
      title: <CapHeading type="h4">Expense Name</CapHeading>,
      dataIndex: 'expenseName',
      key: 'expenseName',
    },
    {
      title: <CapHeading type="h4">Amount</CapHeading>,
      dataIndex: 'expenseAmount',
      key: 'expenseAmount',
    },
    {
      title: <CapHeading type="h4">Date</CapHeading>,
      dataIndex: 'expenseDate',
      key: 'expenseDate',
    },
    {
      title: <CapHeading type="h4">Category</CapHeading>,
      dataIndex: 'expenseCategory',
      key: 'expenseCategory',
    },
    {
      title: <CapHeading type="h4">Remove Expense</CapHeading>,
      dataIndex: 'remove_expense',
      key: 'remove_expense',
      width: '15%',
      render: (_, record) => (
        <CapButton type="danger" onClick={() => handleRemove(record.key)}>
          Remove
        </CapButton>
      ),
    },
  ];

  // Map expenses data to table data
  const data = expensesData.map(expense => ({
    key: expense.id,
    expenseName: expense.description,
    expenseAmount: expense.amount,
    expenseDate: expense.date,
    expenseCategory: expense.category,
  }));

  if (loading) {
    return <CapHeading type="h3">Loading...</CapHeading>;
  }
  if (error) {
    return <CapHeading type="h3">Error fetching expenses</CapHeading>;
  }
  return <Table columns={columns} dataSource={data} />;
};

const mapStateToProps = createStructuredSelector({
  expenses: makeExpensesSelector(),
  loading: makeLoadingSelector(),
  error: makeErrorSelector(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpenseList);
