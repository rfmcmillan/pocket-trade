import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../store';

class CreateCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      const { name, streetAddress, city, state, zip } = this.state;
      await this.props.create(name, streetAddress, city, state, zip);
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { name, streetAddress, city, state, zip, error } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h4 id="add-campus">Add Another Campus:</h4>
        <form onSubmit={onSave}>
          <h5 className="error">
            {!!error &&
              JSON.stringify(
                error.errors.map((error) => {
                  return error.message;
                }),
                null
              )}
          </h5>
          <label>Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <br />
          <label>Street Address:</label>
          <input
            name="streetAddress"
            value={streetAddress}
            onChange={onChange}
          />
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (name, streetAddress, city, state, zip) =>
      dispatch(createCampus(name, streetAddress, city, state, zip, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateCampus);
