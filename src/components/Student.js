import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({ student, studentCampus }) => {
  if (!student.id) {
    return '...loading user';
  }
  return (
    <div>
      <h3>
        {student.firstName} {student.lastName}
      </h3>
      <img src={student.imageUrl} />
      <ul>
        <li>Email: {student.email}</li>
        <li>GPA: {student.gpa}</li>
        <li>
          Campus:{' '}
          {!!studentCampus.id ? (
            <Link to={`/campuses/${studentCampus.id}`}>
              {studentCampus.name}
            </Link>
          ) : (
            'The current student has not yet registered for a campus.'
          )}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  console.log(state);
  const { students, campuses } = state;
  let student;
  student = students.find((student) => {
    return student.id === (otherProps.match.params.id * 1 || {});
  });

  const studentCampus = !!student.campusId
    ? campuses.find((campus) => {
        return student.campusId === campus.id;
      })
    : {};

  return { student, studentCampus };
};

export default connect(mapStateToProps)(Student);
