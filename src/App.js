import React from 'react';
import { connect } from 'react-redux';
import Nav from './components/Nav/Nav';
import Account from './components/Account';
import { HashRouter, Route } from 'react-router-dom';
import { loadAccount } from './store/account';
import { loadPositions } from './store/positions';
import { loadOrders } from './store/orders';
import updatePositionTableTgtPct from './components/PositionTable/updatePositionTgtPct';

class App extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Nav} />
          <Route component={Account} path="/" exact />
          <Route
            component={updatePositionTableTgtPct}
            path="/edit-position/:id"
          />
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
      dispatch(loadOrders());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
