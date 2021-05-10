import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UNREGISTER_STUDENT } from '../store';

const Campus = ({ campus, campusStudents, unregister }) => {
  if (!campus.id) {
    return '...loading user';
  }
  return (
    <div>
      <h3>{campus.name}</h3>
      <img src={campus.imageUrl} width="500" />
      <h5>Address:</h5>
      <p>
        {campus.streetAddress}
        <br />
        {campus.city}, {campus.state} {campus.zip}
      </p>
      <h5>Description:</h5>
      <p>{campus.description}</p>
      <h5>Students</h5>
      <ul>
        {campusStudents.length ? (
          campusStudents.map((student, index) => {
            return (
              <li key={index}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <button
                  onClick={() => unregister(student)}
                  className="unregister"
                >
                  Unregister
                </button>
              </li>
            );
          })
        ) : (
          <li>No students are currently enrolled</li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  const { campuses, students } = state;
  const campusStudents = students.filter((student) => {
    return student.campusId === otherProps.match.params.id * 1;
  });
  let campus;
  campus = campuses.find((campus) => {
    return campus.id === (otherProps.match.params.id * 1 || {});
  });

  return { campus, campusStudents };
};

const mapDispatchToProps = (dispatch) => ({
  unregister: async (student) => {
    try {
      const unregisteredStudent = (
        await axios.put(`api/students/${student.id}`, { campusId: null })
      ).data;

      dispatch({
        type: UNREGISTER_STUDENT,
        unregisteredStudent,
      });
    } catch (error) {
      console.error(error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
