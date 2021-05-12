import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { loadAccount } from '../../store/account';
import RegularButton from '../CustomButtons/Button';
import CustomInput from '../CustomInput/CustomInput';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';
import classNames from 'classnames';
import Header from '../Header/Header.js';
import HeaderLinks from '../Header/HeaderLinks.js';
import vanguard from '../../assets/img/vanguard.jpg';

import '@fontsource/roboto';

const useStyles = makeStyles(styles);

const EditAccount = (props) => {
  const [stocks, bonds, frequency] = React.useState('');
  const classes = useStyles();

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  return (
    <div id="account">
      <Typography variant="h4" component="h4" gutterBottom>
        Edit Allocations
      </Typography>
      <h1></h1>
      <br />
      {/* <img alt="..." src={vanguard} className={navImageClasses} /> */}
      <form>
        <TextField
          id="outlined-stocks-input"
          label="Stocks"
          type="stocks"
          variant="outlined"
        />
        <TextField
          id="outlined-bonds-input"
          label="Bonds"
          type="bonds"
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="frequency-label">Frequency</InputLabel>
          <Select
            labelId="frequency-label"
            id="frequency"
            value={frequency}
            //to be created
            onChange={handleChange}
            label="Frequency"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'monthly'}>Monthly</MenuItem>
            <MenuItem value={'quarterly'}>Quarterly</MenuItem>
            <MenuItem value={'yearly'}>Yearly</MenuItem>
          </Select>
        </FormControl>
      </form>
      <RegularButton>Save</RegularButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    load: (account) => dispatch(loadAccount(account, history)),
  };
};

export default connect(null, mapDispatchToProps)(EditAccount);
