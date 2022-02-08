import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import "@fontsource/roboto";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 10px" },
  targetPct: { width: "25%" },
  textField: {
    marginLeft: 50,
    maxWidth: 75,
    color: "#d3bcbd",
  },
});

const TargetInput = (props) => {
  const { row, onChange, localTargetPct } = props;

  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.textField}
        label={`${(row.tgtPct * 100).toFixed(2)}%`}
        color="primary"
        onChange={onChange}
        name={row.symbol}
        value={localTargetPct ? localTargetPct : 0}
        variant="filled"
        size="small"
      ></TextField>
    </div>
  );
};

TargetInput.propTypes = {
  row: PropTypes.object,
  onChange: PropTypes.func,
  localTargetPct: PropTypes.string,
};

export default TargetInput;
