import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { loadAccount } from '../store/account';

const Account = () => {
  return <div id="account">'Account Info'</div>;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    load: (account) => dispatch(loadAccount(account, history)),
  };
};

export default connect(null, mapDispatchToProps)(Account);
