import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div>
      <div id="nav">
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <Link to="/campuses">Campuses</Link>
        </h3>
        <h3>
          <Link to="/students">Students</Link>
        </h3>
      </div>
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Nav);

//temp
