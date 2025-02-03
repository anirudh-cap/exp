import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CapRow, CapTable, CapModal, CapHeading, CapButton, CapInput, CapSelect } from '@capillarytech/cap-ui-library';
import { bindActionCreators } from 'redux';
import * as actions from '../../pages/ExpenseHome/actions';
import { createStructuredSelector } from 'reselect';
import { makeExpensesSelector, makeLoadingSelector, makeErrorSelector } from '../../pages/ExpenseHome/selectors';

const ExpenseList = ({ className, expenses, loading, error, actions }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');

    const handleRemove = (key) => {
        actions.deleteExpenseRequest(key);
    };

    const handleAddExpense = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = () => {
        const newExpense = {
            description: expenseName,
            amount: parseFloat(expenseAmount),
            date: expenseDate,
            category: expenseCategory,
        };

        actions.addExpenseRequest(newExpense);

        // Reset form fields and hide the modal
        setExpenseName('');
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseCategory('');
        setIsModalVisible(false);
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
                <CapButton type="secondary" onClick={() => handleRemove(record.key)}>
                    Remove
                </CapButton>
            ),
        }
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

    return (
        <CapRow>
            {/* Add Expense Button */}
            <CapButton type="primary" onClick={handleAddExpense} style={{ marginBottom: 16 }}>
                Add Expense
            </CapButton>

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
                    onChange={(e) => setExpenseName(e.target.value)}
                    required
                    style={{ marginBottom: 8 }}
                />
                <CapInput
                    label="Amount"
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    required
                    style={{ marginBottom: 8 }}
                />
                <CapInput
                    label="Date"
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    required
                    style={{ marginBottom: 8 }}
                />
                <CapSelect
                    label="Category"
                    value={expenseCategory}
                    onChange={(value) => setExpenseCategory(value)}
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

            {/* Expenses Table */}
            <CapTable columns={columns} style={{backgroundColor:'#f0f2ff'}}dataSource={data} />
        </CapRow>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
