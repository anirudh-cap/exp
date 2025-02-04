import React from 'react'
import CapGraph from "@capillarytech/cap-ui-library/CapGraph";
import { createStructuredSelector } from 'reselect';
import { makeExpensesSelector } from '../ExpenseHome/selectors';
import { connect } from 'react-redux';

const ExpenseGraph = ({expenses}) => {
      const data = expenses.map((expense) => ({
        expenseCategory: expense.category,
        key: expense.id,
        expenseAmount: parseInt(expense.amount),
      }))
  return (
    <CapGraph height={400} data={data } xAxis='expenseCategory' yAxis='expenseAmount' legend={{
        marker: "circle",
          position: "bottom-left",
    }}
    graphList={[{
        type: "intervalStack",
        barColors: ["#BAE1FF", "#489FF2", "#1D61EE", "#2546B3"],
        stackBy: "key",
        groupBy: "expenseCategory",
    }]}
    size={12}
    />
  )
  
}
const mapStateToProps = createStructuredSelector({
    expenses : makeExpensesSelector(),
  });

export default connect(mapStateToProps)(ExpenseGraph);