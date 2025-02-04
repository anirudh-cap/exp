import {
  CapButton,
  CapCard,
  CapHeading,
  CapInput,
  CapSpin,
} from '@capillarytech/cap-ui-library';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import * as actions from './action';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUserData } from './Selectors';

const Signin = props => {
  const {
    signInLable,
    userEmailLable,
    userPasswordLable,
    onSuccess,
    onFailure,
    onWarning,
    actions,
    libraryData,
  } = props;

  const { libSigninRequest, libSigninSuccess, libSigninFailure } = actions;
  const [loginProgress, updateLoginProgress] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  const handleEmailChange = event => {
    setUserEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSigninProcess = () => {
    updateLoginProgress(state => !state);
  };

  const makeSigninReq = (email, password) => {
    libSigninRequest({ email, password }, data => {
      if (data.status === 400) {
        onFailure(data);
      } else {
        const Userdata = data.data.resUser;
        localStorage.setItem('token', Userdata.token);
        localStorage.setItem('userId', Userdata.userid);
        localStorage.setItem('userEmail', Userdata.useremail);
        localStorage.setItem('userType', Userdata.usertype);
        localStorage.setItem('userName', Userdata.username);
        onSuccess(data);
      }
    });
  };

  const handleSignIn = async () => {
    handleSigninProcess();
    const password = userPassword;
    const email = userEmail;
    if (email === '') {
      handleSigninProcess();
      onWarning({ message: 'Please Enter Email !' });
    } else if (password === '') {
      handleSigninProcess();
      onWarning({ message: 'Please enter password !' });
    } else {
      handleSigninProcess();
      makeSigninReq(email, password);
    }
  };
  return (
    <CapSpin spinning={loginProgress}>
      <section className="cap-login-container">
        <CapCard className="cap-login-card">
          <CapHeading className="cap-sigin-heading" type="h2">
            {signInLable}
          </CapHeading>
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
              {signInLable}
            </CapButton>
            <div style={{ marginTop: '20px' }}>
              First time visting Cap Library ?
              <Link to="/libSignup">Sign-up!</Link>
            </div>
          </div>
        </CapCard>
      </section>
    </CapSpin>
  );
};

Signin.propTypes = {
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  onWarning: PropTypes.func,
  signInLable: PropTypes.string,
  userEmailLable: PropTypes.string,
  userPasswordLable: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  libraryData: makeSelectUserData(),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'getUserData',
  reducer,
});

const withSaga = injectSaga({ key: 'getUserData', saga });

export default compose.apply(null, [withSaga, withReducer, withConnect])(
  Signin,
);

// export default compose(
//   withSaga,
//   withReducer,
//   withConnect,
// )(Signin);
