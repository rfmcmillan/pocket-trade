import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../store';

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus.id ? this.props.campus.name : '',
      streetAddress: this.props.id ? this.props.campus.streetAddress : '',
      city: this.props.id ? this.props.campus.city : '',
      state: this.props.id ? this.props.campus.state : '',
      zip: this.props.id ? this.props.campus.zip : '',
      error: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { campus } = this.props;
    if (!prevProps.campus.id && campus.id) {
      this.setState({
        name: campus.name,
        streetAddress: campus.streetAddress,
        city: campus.city,
        state: campus.state,
        zip: campus.zip,
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
        this.props.campus.id,
        this.state.name,
        this.state.streetAddress,
        this.state.city,
        this.state.state,
        this.state.zip
      );
    } catch (error) {
      console.log(error);
      //this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { name, streetAddress, city, state, zip } = this.state;
    const { onSave, onChange } = this;
    return (
      <form onSubmit={onSave}>
        <label>Name:</label>
        <br />
        <input name="name" value={name} onChange={onChange} />
        <br />
        <label>Street Address:</label>
        <input name="streetAddress" value={streetAddress} onChange={onChange} />
        <br />
        <label>City:</label>
        <input name="city" value={city} onChange={onChange} />
        <br />
        <label>State:</label>
        <input name="state" value={state} onChange={onChange} />
        <br />
        <label>Zip:</label>
        <input name="zip" value={zip} onChange={onChange} />
        <br />
        <button>Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const campus =
    state.campuses.find(
      (campus) => campus.id === otherProps.match.params.id * 1
    ) || {};

  return { campus };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (id, name, streetAddress, city, state, zip) => {
      return dispatch(
        updateCampus(id, name, streetAddress, city, state, zip, history)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);
