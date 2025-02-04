import {
  CapButton,
  CapCard,
  CapHeading,
  CapInput,
  CapSpin,
} from '@capillarytech/cap-ui-library';
import PropTypes from 'prop-types';
import Axios from 'axios';
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import injectSaga from '../../../utils/injectSaga';
import saga from './saga';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Signup(props) {
  const {
    signUpLable,
    userNameLable,
    userEmailLable,
    userPasswordLable,
    onSuccess,
    onFailure,
    onWarning,
    actions,
  } = props;

  const [signupProcess, updateSignupProgress] = useState(false);
  const { libSignupRequest } = actions;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  const handleNameChange = event => {
    setUserName(event.target.value);
  };
  const handleEmailChange = event => {
    setUserEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSignupProcess = () => {
    updateSignupProgress(state => !state);
  };

  const makeSignupRequest = (username, useremail, userpassword) => {
    libSignupRequest({ username, useremail, userpassword }, data => {
      if (data.data.success === true) {
        onSuccess(data);
      } else if (data.status === 409) {
        onWarning(data.data);
      } else {
        onFailure(data.data);
      }
    });
  };

  const handleSignIn = async () => {
    handleSignupProcess();
    const username = userName;
    const useremail = userEmail;
    const userpassword = userPassword;

    if (!userName) {
      handleSignupProcess();
      onWarning({ message: 'Please enter Username !' });
    } else if (!userEmail) {
      handleSignupProcess();
      onWarning({ message: 'Please Enter Email !' });
    } else if (!userPassword) {
      handleSignupProcess();
      onWarning({ message: 'Please Enter Password !' });
    } else {
      handleSignupProcess();
      makeSignupRequest(username, useremail, userpassword);
    }
    // dispatch(libSignupRequest(userName, userEmail, userPassword));
  };

  return (
    <CapSpin spinning={signupProcess}>
      <section className="cap-login-container">
        <CapCard className="cap-login-card">
          <CapHeading className="cap-sigin-heading" type="h2">
            {signUpLable}
          </CapHeading>
          <CapInput
            className="cap-login-input"
            labelPosition="top"
            label={userNameLable}
            value={userName}
            onChange={handleNameChange}
            isRequired
          />
          <CapInput
            className="cap-login-input"
            labelPosition="top"
            label={userEmailLable}
            value={userEmail}
            onChange={handleEmailChange}
            isRequired
          />
          <CapInput
            type="password"
            className="cap-login-input"
            labelPosition="top"
            label={userPasswordLable}
            value={userPassword}
            onChange={handlePasswordChange}
            isRequired
          />
          <div className="cap-login-centeringDiv">
            <CapButton className="cap-login-button" onClick={handleSignIn}>
              Sign up
            </CapButton>
            <div style={{ marginTop: '20px' }}>
              <Link to="/libSignin">Already User Signin !</Link>
            </div>
          </div>
        </CapCard>
      </section>
    </CapSpin>
  );
}

Signup.propTypes = {
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  signUpLable: PropTypes.string,
  userNameLable: PropTypes.string,
  userEmailLable: PropTypes.string,
  userPasswordLable: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({
  key: 'setUserData',
  reducer,
});

const withSaga = injectSaga({
  key: 'setUserData',
  saga,
});

export default compose.apply(null, [withSaga, withReducer, withConnect])(
  Signup,
);
