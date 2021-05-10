import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { destroyCampus } from '../store';

const Campuses = (props) => {
  const { campuses, destroy } = props;

  return (
    <div>
      <h3>Campuses</h3>
      {!!campuses.length ? (
        <ul>
          {campuses.map((campus, index) => {
            return (
              <li key={index}>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                <button onClick={() => destroy(campus)} className="delete">
                  X
                </button>
                <br />
                <img id="campus-img" src={campus.imageUrl} width="150" />
              </li>
            );
          })}
        </ul>
      ) : (
        <i>There are currently no campuses in the database. </i>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (campus) => dispatch(destroyCampus(campus, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
