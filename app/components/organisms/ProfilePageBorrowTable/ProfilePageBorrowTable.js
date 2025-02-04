import React, { useEffect, useState } from 'react';
import {
  CapButton,
  CapHeading,
  CapNotification,
  CapRow,
  CapTable,
} from '@capillarytech/cap-ui-library';
import moment from 'moment';
//import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router';
import saga from './saga';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import * as actions from './actions';
import { profilePageBorrowedReducer } from './reducer';
import { makeSelectUserBorrowedBooksData } from './selectors';
import { publicPath } from '../../../config/path';

const ProfilePageBorrowTable = ({ className, bookBorrowedData, actions }) => {
  const history = useHistory();
  const [toggle, setToggle] = useState(0);
  const user = localStorage.getItem('userId');
  useEffect(
    () => {
      actions.fetchUserBorrowedBooks({
        userId: user,
      });
    },
    [toggle],
  );
  if (bookBorrowedData.getError) {
    const errorbookBorrowData = bookBorrowedData.getError.message;
    if (errorbookBorrowData.status === 404) {
      CapNotification.warning(errorbookBorrowData);
      history.push(`/libSignin`);
    }
  }

  const borrowedBooks = bookBorrowedData.getBooksBorrowed;
  const dataSource = [];
  borrowedBooks.forEach(book => {
    dataSource.push({
      _id: book?._id,
      book_id: book?.book_id,
      book_name: book?.book_name,
      book_author: book?.book_author,
      book_genre: book?.book_genre,
      request_date: moment(
        book?.borrowers.find(borrower => borrower.userId === user)
          ?.borrowedDate,
      ).format('YYYY-MM-DD'),
      due_date: moment(
        book?.borrowers.find(borrower => borrower.userId === user)
          ?.borrowedDate,
      )
        .add('days', 7)
        .format('YYYY-MM-DD'),
    });
  });

  const handleReturn = (userId, bookId) => {
    setToggle(prev => 1 - prev);
    actions.returnUserBorrowedBooks({ userId: userId, bookId: bookId });
  };

  const columns = [
    {
      title: <CapHeading type="h3">Book Title</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },
    {
      title: <CapHeading type="h3">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Book Genre</CapHeading>,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Request Date</CapHeading>,
      dataIndex: 'request_date',
      key: 'request_date',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Due Date</CapHeading>,
      dataIndex: 'due_date',
      key: 'due_date',
      width: '15%',
    },
    {
      render: (text, record) => (
        <CapButton
          type="secondary"
          size="small"
          variant="contained"
          onClick={() => handleReturn(user, record._id)}
        >
          Return Book
        </CapButton>
      ),
    },
  ];

  return (
    <CapRow className={className}>
      <CapTable className="m-30" columns={columns} dataSource={dataSource} />
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookBorrowedData: makeSelectUserBorrowedBooksData(state),
  });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userReturnBook', saga });
const withReducer = injectReducer({
  key: 'profilePageBorrowedReducer',
  reducer: profilePageBorrowedReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(ProfilePageBorrowTable, styles));
