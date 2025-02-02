import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { CapRow, CapForm, CapButton } from "@capillarytech/cap-ui-library";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import * as actions from "../../pages/ExpenseHome/actions";
import injectSaga from "@capillarytech/cap-coupons/utils/injectSaga";
import injectReducer from "@capillarytech/cap-coupons/utils/injectReducer";
import saga from "../../pages/ExpenseHome/saga";
import expenseReducer from "../../pages/ExpenseHome/reducer";
import { addExpenseRequest } from "../../pages/ExpenseHome/actions";
import { makeErrorSelector, makeExpensesSelector, makeLoadingSelector } from "../../pages/ExpenseHome/selectors";

const AddExpense = ({ addExpenseRequest, expenses, loading, error }) => {
    console.log("expenses from AddExpense:", expenses);

    const [expenseData, setExpenseData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
    });

    console.log("expenseData:", expenseData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure all fields are filled
        if (!expenseData.title || !expenseData.amount || !expenseData.category || !expenseData.date) {
            alert("Please fill all fields!");
            return;
        }

        // Dispatch Redux action
        addExpenseRequest(expenseData);

        // Redirect to home page after adding an expense
        navigate("/home");
    };

    return (
        <>
            <h2>Add Expense</h2>
            <CapForm onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={expenseData.title} onChange={handleChange} required />
                </div>

                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} required />
                </div>

                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={expenseData.category} onChange={handleChange} required />
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={expenseData.date} onChange={handleChange} required />
                </div>

                <CapButton type="primary" htmlType="submit">
                    Add Expense
                </CapButton>
            </CapForm>
        </>
    );
};

const mapStateToProps = state => createStructuredSelector({
    expenses: makeExpensesSelector(state),
    loading: makeLoadingSelector(state),
    error: makeErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    addExpenseRequest: (expense) => dispatch(addExpenseRequest(expense)),
});

const withReducer = injectReducer({
    key: "expenses",
    reducer: expenseReducer,
});

const withSaga = injectSaga({ key: "expenses", saga });

export default compose(withReducer, withSaga, connect(mapStateToProps, mapDispatchToProps))(AddExpense);
