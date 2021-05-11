import React from 'react';
import { connect } from 'react-redux';

import Nav from './components/Nav';
import Account from './components/Account/Account';
import EditAccount from './components/EditAccount/EditAccount';
import store from './store';
import { HashRouter, Route } from 'react-router-dom';
import { loadAccount } from './store/account';
import { loadPositions } from './store/positions';

class App extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <HashRouter>
        <div>
          {/* <Route component={Nav} /> */}
          <Route component={Account} path="/account" exact />
          <Route component={EditAccount} path="/edit-account" exact />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadAccount());
      dispatch(loadPositions());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
