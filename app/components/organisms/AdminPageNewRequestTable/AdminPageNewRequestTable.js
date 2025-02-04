import {
  CapTable,
  CapRow,
  CapModal,
  CapHeading,
  CapButton,
  CapInput,
  CapDatePicker,
  CapNotification,
} from '@capillarytech/cap-ui-library';
import React from 'react';
import { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import injectSaga from 'utils/injectSaga';
import { useHistory } from 'react-router';
import saga from './saga';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import * as actions from './actions';
import { profilePageNewRequestReducer } from './reducer';
import { makeSelectUserNewBookRequestsData } from './selectors';

export const AdminPageNewRequestTable = ({
  className,
  bookRequestsData,
  actions,
}) => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  // console.log(bookRequestsData);
  const dataSource = bookRequestsData.getBookRequests;
  dataSource.forEach(obj => {
    obj.date = moment(obj.date).format('YYYY-MM-DD');
  });
  const [newReq, setNewReq] = useState({});
  const [reason, setReason] = useState({});
  const [toggle, setToggle] = useState(0);
  const handleCancelChange = event => {
    const { name, value } = event.target;
    setReason(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setNewReq(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const showAcceptModal = id => {
    const tempRow = dataSource.find(obj => obj?._id === id);
    setNewReq(prevFormData => ({
      ...prevFormData,
      _id: id,
      book_name: tempRow?.book_name,
      book_author: tempRow?.book_author,
      book_genre: '',
      total_count: null,
    }));
    setIsAcceptModalOpen(true);
  };

  const showCancelModal = id => {
    setReason(prevFormData => ({
      ...prevFormData,
      _id: id,
      reason: '',
    }));
    setIsCancelModalOpen(true);
  };

  const handleAcceptModalAdd = () => {
    setIsAcceptModalOpen(false);
    if (
      newReq.book_name === '' ||
      newReq.book_author === '' ||
      newReq.book_genre === '' ||
      newReq.total_count === null
    ) {
      CapNotification.warning({ message: 'Please enter valid details' });
    } else {
      newReq.current_count = newReq.total_count;
      actions.acceptNewBookRequest(newReq);
      setToggle(prev => 1 - prev);
    }
  };

  const userType = localStorage.getItem('userType');
  if (userType === 'user') {
    history.push('/AccessForbidden');
  }

  const handleAcceptModalCancel = () => {
    setIsAcceptModalOpen(false);
  };

  const handleCancelModalAdd = () => {
    setIsCancelModalOpen(false);
    if (reason?.reason === '') {
      CapNotification.warning({ message: 'Please enter a reason' });
    } else {
      actions.cancelUserNewRequestedBooks(reason);
      setToggle(prev => 1 - prev);
    }
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalOpen(false);
  };

  const columns = [
    {
      title: <CapHeading type="h3">User</CapHeading>,
      dataIndex: 'email',
      key: 'email',
      width: '15%',
    },
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
      title: <CapHeading type="h3">Request Date</CapHeading>,

      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
    {
      render: (text, record) =>
        text.state == 'Pending' ? (
          <CapButton
            type="secondary"
            size="small"
            variant="contained"
            onClick={() => showAcceptModal(text._id)}
          >
            Approve
          </CapButton>
        ) : (
          <></>
        ),
      width: '7%',
    },
    {
      render: (text, record) =>
        text.state == 'Pending' ? (
          <CapButton
            className="request-cancel-btn"
            type="secondary"
            size="small"
            variant="contained"
            pagination={{
              current: page,
              pageSize: 9,
              total: bookRequestsData.getTotalCount,
            }}
            onClick={() => showCancelModal(text._id)}
          >
            Reject
          </CapButton>
        ) : (
          <></>
        ),
      width: '7%',
    },
  ];

  useEffect(
    () => {
      actions.fetchUserNewRequestedBooks(page);
    },
    [page, toggle],
  );
  // console.log(bookRequestsData)
  return (
    <CapRow className={className}>
      <CapButton
        className="m-30"
        type="primary"
        size="small"
        variant="contained"
        onClick={() => showAcceptModal()}
      >
        Add a book
      </CapButton>
      <CapTable
        className="m-30"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: page,
          pageSize: 9,
          total: bookRequestsData.getCount,
        }}
        onChange={pagination => {
          setPage(pagination.current);
        }}
      />
      <CapRow className="modal">
        <CapModal
          title="Accept New Request"
          visible={isAcceptModalOpen}
          width={700}
          onCancel={handleAcceptModalCancel}
          footer={[
            <CapButton
              type="secondary"
              key="close"
              onClick={handleAcceptModalCancel}
            >
              Close
            </CapButton>,
            <CapButton
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={handleAcceptModalAdd}
            >
              Approve
            </CapButton>,
          ]}
        >
          <CapInput
            value={newReq.book_name}
            name="book_name"
            label="Title"
            isRequired
            onChange={handleChange}
          />
          <CapRow />
          <CapInput
            value={newReq.book_author}
            name="book_author"
            label="Author"
            isRequired
            onChange={handleChange}
          />
          <CapInput
            name="book_genre"
            label="Genre"
            isRequired
            value={newReq.book_genre}
            onChange={handleChange}
          />
          <CapInput
            name="total_count"
            label="Count"
            isRequired
            value={newReq.total_count}
            onChange={handleChange}
          />
        </CapModal>
        <CapModal
          title="Reject Request"
          okText="Reject"
          closeText="Close"
          visible={isCancelModalOpen}
          onOk={handleCancelModalAdd}
          onCancel={handleCancelModalCancel}
          width={700}
        >
          <CapInput
            name="reason"
            label="Reason"
            value={reason.reason}
            onChange={handleCancelChange}
            isRequired
          />
        </CapModal>
      </CapRow>
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookRequestsData: makeSelectUserNewBookRequestsData(state),
  });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'profilePageNewRequest', saga });

const withReducer = injectReducer({
  key: 'profilePageNewRequest',
  reducer: profilePageNewRequestReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(withStyles(AdminPageNewRequestTable, styles)));
