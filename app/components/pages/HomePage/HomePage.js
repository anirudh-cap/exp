import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CapNotification, CapRow } from '@capillarytech/cap-ui-library';
import { useHistory } from 'react-router';
import BookList from '../../organisms/BookList/BookList';
import Filter from '../../organisms/Filter/Filter';
import { fetchBookList } from './actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
  makeErrorState,
} from './selector';
import withStyles from '../../../utils/withStyles';
import styles from './styles';
import Navbar from '../../organisms/Navbar/Navbar';
import { publicPath } from '../../../config/path';

const RECORDS_PER_PAGE = 10;

const HomePage = ({
  className,
  allBooks = [],
  totalBooks = 0,
  isLoading,
  actions,
  error,
}) => {
  const history = useHistory();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [enteredFilterValue, setEnteredFilterValue] = useState('');
  const [filterBy, selectedFilterBy] = useState('BY_NAME');

  useEffect(
    () => {
      fetchBooks();
    },
    [currentPageNumber, enteredFilterValue],
  );

  function onchange(data) {
    setCurrentPageNumber(data.current);
  }

  function getFilterKey() {
    switch (filterBy) {
      case 'BY_GENRE':
        return 'genre';
      case 'BY_AUTHOR':
        return 'authorName';
      case 'BY_NAME':
        return 'bookName';
      case 'NO_FILTER':
      default:
        return '';
    }
  }

  function fetchBooks() {
    const requestPayload = {
      limit: RECORDS_PER_PAGE,
      page: currentPageNumber,
    };

    const filterKey = getFilterKey();

    if (filterBy !== '') requestPayload[filterKey] = enteredFilterValue;

    actions.fetchBookList(requestPayload);
  }
  if (error) {
    if (error.message.status === 404) {
      CapNotification.warning(error.message);
      history.push(`/libSignin`);
    } else {
      CapNotification.error(error);
    }
  }
  function setFilterBy(value) {
    selectedFilterBy(value);
  }

  function onFilterValueChange(value) {
    setCurrentPageNumber(1);
    setEnteredFilterValue(value);
  }

  return (
    <>
      <Navbar />
      <CapRow className={className}>
        <CapRow className="requests-container">
          <Filter
            selectedFilterBy={filterBy}
            handleFilterByChange={setFilterBy}
            filterValue={enteredFilterValue}
            handleFilterValueChange={onFilterValueChange}
          />
          <BookList
            pagination={{
              current: currentPageNumber,
              pageSize: 10,
              total: totalBooks,
            }}
            loading={isLoading}
            onChange={onchange}
            dataSource={allBooks}
            totalBooks={totalBooks}
          />
        </CapRow>
      </CapRow>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allBooks: makeAllBookListSelector(),
  totalBooks: makeTotalBooksSelctor(),
  isLoading: makeLoadingState(),
  error: makeErrorState(),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchBookList: payload => dispatch(fetchBookList(payload)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(HomePage, styles));
