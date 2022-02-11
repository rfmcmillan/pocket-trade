import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import "@fontsource/roboto";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 10px" },
  targetPct: { width: "25%" },
  textField: {
    width: 190,
  },
});

const TargetInput = (props) => {
  const { row, onChange, localTargetPct } = props;

  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      autoFocus={true}
      color="primary"
      label="New Target Allocation %"
      onChange={onChange}
      name={row.symbol}
      value={localTargetPct}
      variant="outlined"
      size="small"
    ></TextField>
  );
};

TargetInput.propTypes = {
  row: PropTypes.object,
  onChange: PropTypes.func,
  localTargetPct: PropTypes.string,
};

export default TargetInput;
