import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.student.id ? this.props.student.firstName : '',
      lastName: this.props.student.id ? this.props.student.lastName : '',
      email: this.props.student.id ? this.props.student.email : '',
      error: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { student } = this.props;
    if (!prevProps.student.id && student.id) {
      this.setState({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      });
    }
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async onSave(event) {
    event.preventDefault();
    try {
      await this.props.update(
        this.props.student.id,
        this.state.firstName,
        this.state.lastName,
        this.state.email
      );
    } catch (error) {
      console.log(error);
      //this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { firstName, lastName, email } = this.state;
    const { onSave, onChange } = this;
    return (
      <form onSubmit={onSave}>
        <label>First Name:</label>
        <br />
        <input name="firstName" value={firstName} onChange={onChange} />
        <label>Last Name:</label>
        <br />
        <input name="lastName" value={lastName} onChange={onChange} />
        <label>Email:</label>
        <br />
        <input name="email" value={email} onChange={onChange} />
        <button>Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const student =
    state.students.find(
      (student) => student.id === otherProps.match.params.id * 1
    ) || {};

  return { student };
};

const mapDispatchToProps = (dispatch, { history }) => {
  /*
  Try Eliot's techique without a thunk; here's an example:
  const mapDispatchToProps = (dispatch) => ({
    getUsers: async () => {
      try{
        const res = await axios.get('blah blah blah.com');

        dispatch({
          type:'thing',
          res,
        });
      } catch(error) {
        console.error(error)
      }
    }
  })
  */

  return {
    update: (id, firstName, lastName, email) => {
      return dispatch(updateStudent(id, firstName, lastName, email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
