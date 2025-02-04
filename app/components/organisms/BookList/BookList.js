import React, { useState, useEffect } from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import style from './styles';
import {
  issueBook,
  cancelIssueBook,
  reserveBook,
} from '../../pages/HomePage/actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
} from '../../pages/HomePage/selector';
import config from '../../../config/app';

export const BookList = ({
  className,
  dataSource,
  loading,
  pagination,
  onChange,
  actions,
}) => {
  const user = localStorage.getItem('userId');

  function issueOnClick(bookId, userId = user) {
    const requestPayload = {
      book_id: bookId,
      user_id: userId,
    };
    actions.issueBook(requestPayload);
    location.reload();
  }

  function reserveOnClick(bookId, userId = user) {
    const requestPayload = {
      book_id: bookId,
      user_id: userId,
    };
    actions.reserveBook(requestPayload);
    location.reload();
  }

  const columns = [
    {
      title: <CapHeading type="h4">Book Name</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Book Genre</CapHeading>,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Available Book/Total Book</CapHeading>,
      dataIndex: 'count_ratio',
      key: 'count_ratio',
      width: '15%',
      render: (text, record) => {
        const countRatio = `${record.current_count}/${record.total_count}`;
        return <span>{countRatio}</span>;
      },
    },

    {
      title: <CapHeading type="h4">Button</CapHeading>,
      dataIndex: 'button',
      key: 'button',
      width: '10%',

      render: (text, record) => {
        if (
          record.current_count > 0 &&
          !record?.borrowers?.find(obj => obj.userId === user)
        ) {
          return (
            <CapButton
              size="small"
              color="primary"
              variant="contained"
              onClick={() => issueOnClick(record._id)}
            >
              Get Book
            </CapButton>
          );
        } else if (
          record?.borrowers?.find(obj => obj.userId === user) ||
          record?.requests?.find(obj => obj.userId === user)
        ) {
          return <></>;
        } else if (
          !record?.requests?.find(obj => obj.userId === user) &&
          record.current_count === 0
        ) {
          return (
            <CapButton
              className="request-btn"
              data-testid="request-btn"
              size="small"
              color="primary"
              variant="contained"
              onClick={() => reserveOnClick(record._id)}
            >
              Reserve
            </CapButton>
          );
        }
      },
    },
  ];

  return (
    <CapRow className="table">
      <CapTable
        data-testid="main-table"
        loading={loading}
        onChange={data => onChange(data)}
        pagination={pagination}
        dataSource={dataSource}
        columns={columns}
      />
    </CapRow>
  );
};

const mapStateToProps = createStructuredSelector({
  allBooks: makeAllBookListSelector(),
  totalBooks: makeTotalBooksSelctor(),
  isLoading: makeLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    issueBook: payload => dispatch(issueBook(payload)),
    reserveBook: payload => dispatch(reserveBook(payload)),
    fetchBookList: payload => dispatch(fetchBookList(payload)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(BookList, style));
