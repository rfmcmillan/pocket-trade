import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Nav from "./components/Nav/Nav";
import Account from "./components/Account";
import { HashRouter, Route } from "react-router-dom";
import { loadAccount } from "./store/account";
import { loadPositions } from "./store/positions";
import { loadOrders } from "./store/orders";
import { loadPortfolioHistory } from "./store/portfolioHistory";

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
      dispatch(loadPortfolioHistory());
    },
  };
};

App.propTypes = {
  bootstrap: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
