import React from 'react';
import { connect, Provider } from 'react-redux';

import Home from './Home';
import Campuses from './Campuses';
import Campus from './Campus';
import CreateCampus from './CreateCampus';
import UpdateCampus from './UpdateCampus';
import Students from './Students';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import Nav from './Nav';
import Account from './Account';
import store, { loadCampuses, loadStudents } from '../store';
import { HashRouter, Route } from 'react-router-dom';

//import any sub-components

class App extends React.Component {
  //constructor to initialize state

  //any lifecycle methods
  componentDidMount() {
    this.props.bootstrap();
  }

  //any custom methods
  //render
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route component={Nav} />
            <Route component={Home} path="/" exact />
            <Route component={CreateCampus} path="/campuses" exact />
            <Route component={Campuses} path="/campuses" exact />
            <Route component={UpdateCampus} path="/campuses/:id" exact />
            <Route component={Campus} path="/campuses/:id" exact />
            <Route component={CreateStudent} path="/students" exact />
            <Route component={Students} path="/students" exact />
            <Route component={UpdateStudent} path="/students/:id" exact />
            <Route component={Student} path="/students/:id" exact />
            <Route component={Account} path="/account" exact />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadCampuses());
      dispatch(loadStudents());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
