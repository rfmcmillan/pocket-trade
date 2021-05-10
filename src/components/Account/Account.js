import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RegularButton from '../CustomButtons/Button';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';

import { loadAccountActionCreator, loadAccount } from '../../store/account';
import '@fontsource/roboto';

const useStyles = makeStyles(styles);

const Account = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  console.log('state.account:', account);
  return (
    <div id="account">
      <Typography variant="h4" component="h4" gutterBottom>
        Your Account
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your Account
      </Typography>
      <br />
      <RegularButton>Save</RegularButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {};

export default Account;
