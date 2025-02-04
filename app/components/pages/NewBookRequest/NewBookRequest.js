import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';
import {
  CapButton,
  CapHeading,
  CapInput,
  CapRow,
  CapTable,
  CapHeader,
  CapModal,
  CapSelect,
  CapNotification,
  CapTooltip,
} from '@capillarytech/cap-ui-library';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useHistory } from 'react-router';
import moment from 'moment';
import withStyles from '../../../utils/withStyles';
import saga from './saga';
import styles from './style';
import messages from './messages';
import * as actions from './actions';
import newBookRequestsReducer from './reducer';
import { makeSelectNewBookRequestsData } from './selectors';
import NavBar from '../../organisms/NavBar/NavBar';

export const NewBookRequest = ({ className, bookRequestsData, actions }) => {
  const optionsForSearchFilter = [
    {
      value: 'book_name',
      label: 'By Book Name',
    },
    {
      value: 'book_author',
      label: 'By Book Author',
    },
    {
      value: 'email',
      label: 'By User Email',
    },
  ];
  const columnsForRequestTable = [
    {
      title: <CapHeader size="label1" title="User Email" />,
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: <CapHeader size="label1" title="Book Name" />,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '20%',
    },
    {
      title: <CapHeader size="label1" title="Book Author" />,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '20%',
    },

    {
      title: <CapHeader size="label1" title="Request-Date" />,
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },
    {
      title: <CapHeader size="label1" title="State" />,
      dataIndex: 'state',
      key: 'state',
      width: '20%',
    },
  ];
  const history = useHistory();
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('book_name');
  const [page, setPage] = useState(1);
  //
  const [query, setQuery] = useState({
    searchText: searchText,
    selectedFilter: selectedFilter,
    page: page,
  });

  //
  console.log('bookRequestsData', bookRequestsData);
  if (bookRequestsData.getError !== null) {
    CapNotification.warning({ message: bookRequestsData.getError });

    actions.removeError();
  }

  const getCustomFieldsRow = () => {
    const tableManageCustomFields = bookRequestsData.getBookRequests?.map(
      customFieldData => {
        const {
          email,
          book_author,
          book_name,
          state,
          reason,
          date,
        } = customFieldData;
        return {
          book_name: (
            <CapRow type="flex" align="middle">
              {book_name}
            </CapRow>
          ),
          book_author: (
            <CapRow type="flex" align="middle">
              {book_author}
            </CapRow>
          ),
          email: (
            <CapRow type="flex" align="middle">
              {email}
            </CapRow>
          ),
          state: (
            <CapTooltip title={state === 'Rejected' ? reason : ''}>
              <CapRow type="flex" align="middle" />
              {state}
            </CapTooltip>
          ),
          date: (
            <CapRow type="flex" align="middle">
              {moment(date).format('DD MMM YYYY')}
            </CapRow>
          ),
        };
      },
    );
    return tableManageCustomFields;
  };

  //
  const debouncedFetch = useCallback(
    debounce(actions.fetchAllBookRequestsRequest, 2000),
    [],
  );

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    if (!bookName || !authorName) {
      // alert('Please fill all the fields');
      CapNotification.warning({ message: 'Please fill all the fields' });
      return;
    }
    const book = {
      book_name: bookName,
      book_author: authorName,
      email: `${localStorage.getItem('userEmail')}`,
    };

    actions.addNewBookRequestRequest(book);

    setBookName('');
    setAuthorName('');
    setConfirmLoading(false);
    setOpen(false);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleSearchChange = e => {
    setQuery({ ...query, searchText: e.target.value, page: 1 });
    setPage(1);
    setSearchText(e.target.value);
  };

  const handleFilterChange = value => {
    setSelectedFilter(value);
    setQuery({ ...query, selectedFilter: value });
  };

  // Effects
  useEffect(
    () => {
      actions.fetchAllBookRequestsRequest(query);
    },
    [page],
  );

  useEffect(
    () => {
      debouncedFetch(query);
    },
    [query],
  );

  //console logs

  return (
    <>
      <CapRow className={className}>
        <NavBar />
        <CapRow className="requests-container">
          <CapRow className="top-section" type="flex">
            <CapHeading type="h1" className="heading-text">
              <FormattedMessage {...messages.headingText} />
            </CapHeading>
            <CapButton onClick={showModal}>
              <FormattedMessage {...messages.buttonText} />
            </CapButton>
          </CapRow>

          <CapModal
            title="Enter Book Details"
            visible={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Submit"
            closeText="Cancel"
            width={700}
            getContainer={() => document.querySelector('.requests-container')}
          >
            <CapInput
              className="input-field"
              label="Book Name:"
              placeholder="Enter Book Name"
              onChange={e => setBookName(e.target.value)}
              value={bookName}
            />
            <CapInput
              className="input-field"
              label="Author Name:"
              placeholder="Enter Author Name"
              onChange={e => setAuthorName(e.target.value)}
              value={authorName}
            />
          </CapModal>

          <CapRow className="search-section" type="flex">
            <CapInput
              className="search-field"
              placeholder="Search"
              onChange={handleSearchChange}
              value={searchText}
            />
            <CapSelect
              options={optionsForSearchFilter}
              width="100px"
              value={selectedFilter}
              defaultValue="By Book Name"
              onChange={handleFilterChange}
            />
          </CapRow>
          <CapRow className="table">
            <CapTable
              dataSource={getCustomFieldsRow()}
              columns={columnsForRequestTable}
              pagination={{
                current: page,
                pageSize: 9,
                total: bookRequestsData.getTotalCount,
              }}
              onChange={pagination => {
                setPage(pagination.current);
                setQuery({ ...query, page: pagination.current });
              }}
            />
          </CapRow>
        </CapRow>
      </CapRow>
    </>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookRequestsData: makeSelectNewBookRequestsData(state),
  });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'newBookRequests', saga });
const withReducer = injectReducer({
  key: 'newBookRequests',
  reducer: newBookRequestsReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(withStyles(NewBookRequest, styles)));
