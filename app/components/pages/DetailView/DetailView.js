import React, { useEffect, useState } from 'react';
import { CapHeading, CapTable, CapRow } from '@capillarytech/cap-ui-library';
import NavBar from '../../organisms/NavBar/NavBar';
import withStyles from '../../../utils/withStyles';
import styles from './styles';

const DetailView = ({ className }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/expenses')
      .then(response => response.json())
      .then(data => {
        const groupedData = data.reduce((acc, expense) => {
          const category = expense.category;
          if (!acc[category]) {
            acc[category] = { key: category, name: category, amount: 0 };
          }
          acc[category].amount += expense.amount;
          return acc;
        }, {});

        setExpenseData(Object.values(groupedData));
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  const columns = [
    {
      title: 'Expense Type',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <>
      <CapRow className={className}>
        <NavBar />
        <CapHeading type="h4" style={{ marginBottom: '16px' }}>
          Expense Summary
        </CapHeading>
        <CapTable className="detail-table" dataSource={expenseData} columns={columns} />
      </CapRow>
    </>
  );
};

export default withStyles(DetailView, styles);
