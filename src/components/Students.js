import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from '../store';

const Students = (props) => {
  const { students, destroy } = props;

  return (
    <div>
      <h3>Students</h3>
      {!!students.length ? (
        <ul>
          {students.map((student, index) => {
            return (
              <li key={index}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <button onClick={() => destroy(student)} className="delete">
                  X
                </button>
                <br />
                <img src={student.imageUrl} height="100" />
              </li>
            );
          })}
        </ul>
      ) : (
        <i>There are currently no students in the database.</i>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (student) => dispatch(destroyStudent(student, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
