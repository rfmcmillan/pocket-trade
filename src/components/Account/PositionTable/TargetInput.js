import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, OutlinedInput, FormControl } from "@material-ui/core";
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
    <FormControl error={localTargetPct ? false : true}>
      <InputLabel htmlFor="target-percentage" shrink={true} variant="outlined">
        New Target Allocation %
      </InputLabel>
      <OutlinedInput
        className={classes.textField}
        autoFocus={true}
        color="primary"
        id="target-percentage"
        label="  New Target Allocation %"
        onChange={onChange}
        name={row.symbol}
        size="small"
        type="number"
        value={localTargetPct}
      ></OutlinedInput>
    </FormControl>
  );
};

TargetInput.propTypes = {
  row: PropTypes.object,
  onChange: PropTypes.func,
  localTargetPct: PropTypes.number,
};

export default TargetInput;
