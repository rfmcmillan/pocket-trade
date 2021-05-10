import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { accountReducer } from './account';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

//Action creators & their thunks
const _loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses,
  };
};

const loadCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
  };
};

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus,
  };
};

const createCampus = (name, streetAddress, city, state, zip, history) => {
  return async (dispatch) => {
    const campus = (
      await axios.post('/api/campuses', {
        name,
        streetAddress,
        city,
        state,
        zip,
      })
    ).data;
    dispatch(_createCampus(campus));
    //history.push(`/campuses`);
  };
};

const _destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus,
  };
};

const destroyCampus = (campus, history) => {
  return async (dispatch) => {
    await axios.delete(`api/campuses/${campus.id}`);
    dispatch(_destroyCampus(campus));
    //history.push('/campuses');
  };
};

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus,
  };
};

const updateCampus = (id, name, streetAddress, city, state, zip, history) => {
  return async (dispatch) => {
    const campus = (
      await axios.put(`/api/campuses/${id}`, {
        name,
        streetAddress,
        city,
        state,
        zip,
      })
    ).data;
    dispatch(_updateCampus(campus));
  };
};

const _loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students,
  };
};

const loadStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_loadStudents(students));
  };
};

const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student,
  };
};

const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (
      await axios.post('/api/students', { firstName, lastName, email })
    ).data;
    dispatch(_createStudent(student));
  };
};

const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student,
  };
};

const destroyStudent = (student, history) => {
  return async (dispatch) => {
    await axios.delete(`api/students/${student.id}`);
    dispatch(_destroyStudent(student));
    //history.push('/campuses');
  };
};

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};

const updateStudent = (id, firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (
      await axios.put(`/api/students/${id}`, {
        firstName,
        lastName,
        email,
      })
    ).data;
    dispatch(_updateStudent(student));
  };
};

//Reducers
const campusesReducer = (state = [], action) => {
  if (action.type === LOAD_CAMPUSES) {
    state = action.campuses;
  }
  if (action.type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  }
  if (action.type === DESTROY_CAMPUS) {
    state = state.filter((campus) => campus.id !== action.campus.id);
  }
  if (action.type === UPDATE_CAMPUS) {
    const otherCampuses = state.filter(
      (campus) => campus.id !== action.campus.id
    );
    state = [...otherCampuses, action.campus];
  }
  return state;
};

const studentsReducer = (state = [], action) => {
  if (action.type === LOAD_STUDENTS) {
    state = action.students;
  }
  if (action.type === CREATE_STUDENT) {
    state = [...state, action.student];
  }
  if (action.type === DESTROY_STUDENT) {
    state = state.filter((student) => student.id !== action.student.id);
  }
  if (action.type === UPDATE_STUDENT) {
    const otherStudents = state.filter(
      (student) => student.id !== action.student.id
    );
    state = [...otherStudents, action.student];
  }
  if (action.type === UNREGISTER_STUDENT) {
    const otherStudents = state.filter(
      (student) => student.id !== action.unregisteredStudent.id
    );
    state = [...otherStudents, action.unregisteredStudent];
  }

  return state;
};

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  account: accountReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {
  loadCampuses,
  createCampus,
  destroyCampus,
  updateCampus,
  loadStudents,
  createStudent,
  destroyStudent,
  updateStudent,
  UNREGISTER_STUDENT,
};
