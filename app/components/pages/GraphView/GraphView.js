import React from 'react'
import {CapRow} from '@capillarytech/cap-ui-library';
import ExpenseGraph from './ExpenseGraph';
import { connect } from 'react-redux';
import { makeExpensesSelector } from '../../pages/ExpenseHome/selectors';
import { createStructuredSelector } from 'reselect';
import NavBar from '../../organisms/NavBar/NavBar';

const GraphView = ({expenses}) => {
  return (
    <CapRow>
        <NavBar />
       <ExpenseGraph expenses={expenses}/>
    </CapRow>
  )
}
const mapStateToProps = (state) =>  
    createStructuredSelector({
    expenses: makeExpensesSelector(state),
    });
export default connect(mapStateToProps)(GraphView);