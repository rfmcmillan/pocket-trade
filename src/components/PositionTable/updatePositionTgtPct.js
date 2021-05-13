import axios from 'axios';
import React, { Component } from 'react';
import { updatePosition } from '../../store/positions';
import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

const updatePositionTableTgtPct = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();
  const [tgtPct, setTgtPct] = React.useState(0);
};

const onChange = (ev) => {
  setTgtPct(ev.target.value);
};

const onSave = async (ev) => {
  ev.preventDefault();
  try {
    dispatch(updatePosition(id, name, tgtPct, currPct));
  } catch (error) {
    this.setState({ error: error.response.data.error });
  }
};

export default updatePositionTableTgtPct;
