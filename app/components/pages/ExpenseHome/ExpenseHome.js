// ExpenseHome.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { CapRow, CapHeading } from '@capillarytech/cap-ui-library';
import Filter from '../../organisms/Filter/Filter';
import ExpenseList from '../../organisms/ExpenseList/ExpenseList';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import NavBar from '../../organisms/NavBar/NavBar';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { expenseReducer } from './reducer';
import {
    makeExpensesSelector,
    makeErrorSelector,
    makeLoadingSelector
} from './selectors';

const ExpenseHome = ({ className, expenses, loading, error, actions }) => {
    const [enteredFilterValue, setEnteredFilterValue] = useState('');
    const [filterBy, selectedFilterBy] = useState('BY_NAME');
    
    useEffect(() => {
        actions.fetchExpenseRequest();
    }, []);

    // Calculate totals
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.get('amount'), 0);
    const balance = 100000 - totalExpenses;

    function getFilterKey() {
      switch (filterBy) {
        case 'BY_ID': return 'id';
        case 'BY_NAME': return 'name';
        case 'BY_CATEGORY': return 'category';
        default: return '';      
      }
    }

    return (
        <>
            <NavBar />
            {/* Main container now arranges its children in a column and centers them */}
            <CapRow
                style={{
                    padding: '0 24px',
                    marginTop: 16,
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Filter Section */}
                <CapRow style={{ width: '100%', marginBottom: 16 }}>
                    <Filter
                        selectedFilterBy={filterBy}
                        handleFilterByChange={selectedFilterBy}
                        filterValue={enteredFilterValue}
                        handleFilterValueChange={setEnteredFilterValue}
                    />
                </CapRow>

                {/* Centered Balance and Expenses Section */}
                <CapRow
                    gap="large"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16
                    }}
                >
                    <CapHeading type="h4" style={{ color: '#52c41a', fontSize: '20px' }}>
                        Balance: ₹{balance}
                    </CapHeading>
                    <CapHeading type="h4" style={{ color: '#f5222d', fontSize: '20px' }}>
                        Expenses: ₹{totalExpenses}
                    </CapHeading>
                </CapRow>

                {/* Expense List Section */}
                <ExpenseList className={className} />
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
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'expenses', saga });
const withReducer = injectReducer({ key: 'expenses', reducer: expenseReducer });

export default compose(
    withSaga,
    withReducer,
    withConnect,
)(ExpenseHome);
