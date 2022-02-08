import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TableRow, TableCell } from "@material-ui/core";
import { updatePosition } from "../../../store/positions";
import "@fontsource/roboto";
import TargetInput from "./TargetInput";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 5px", marginBottom: "16px" },
  cancel: { margin: "10px" },
  cell: { padding: "0px 16px 0px 16px" },
  submit: { margin: "10px" },
  targetPct: { width: "25%" },
  textField: {
    maxWidth: 75,
  },
});

const PositionRow = (props) => {
  const dispatch = useDispatch();
  const {
    row,
    edit,
    setEdit,
    currPosition,
    setCurrPosition,
    tgtPctsTotal,
    setTgtPctsTotal,
  } = props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct.toString());
  const classes = useStyles();

  const onCancel = () => {
    setCurrPosition(undefined);
  };

  const onChange = (ev) => {
    const { target } = ev;
    setLocalTargetPct(target.value);
    setTgtPctsTotal(tgtPctsTotal);
  };

  const onSave = () => {
    const localTargetPctFloat = parseFloat(localTargetPct);
    dispatch(updatePosition(row.id, localTargetPctFloat));
    setCurrPosition("");
  };

  return (
    <TableRow>
      <TableCell className={classes.cell} component="th" scope="row">
        {row.name}
        {currPosition !== row.symbol ? (
          <Button
            className={classes.button}
            color="primary"
            onClick={() => {
              setCurrPosition(row.symbol);
            }}
          >
            Edit
          </Button>
        ) : (
          <div>
            <Button
              className={classes.cancel}
              variant="contained"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            {tgtPctsTotal <= 1 ? (
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={onSave}
              >
                Submit
              </Button>
            ) : (
              ""
            )}
          </div>
        )}
      </TableCell>
      <TableCell align="right">{row.symbol}</TableCell>
      <TableCell align="right">
        {currPosition === row.symbol ? (
          <TargetInput
            row={row}
            edit={edit}
            setEdit={setEdit}
            localTargetPct={localTargetPct}
            setLocalTargetPct={setLocalTargetPct}
            onChange={onChange}
          />
        ) : (
          <Typography>{`${(row.tgtPct * 100).toFixed(2)}%`}</Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {`${(row.currPct * 100).toFixed(2)}%`}
      </TableCell>
    </TableRow>
  );
};

PositionRow.propTypes = {
  row: PropTypes.object,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  currPosition: PropTypes.string,
  setCurrPosition: PropTypes.func,
  tgtPctsTotal: PropTypes.number,
};

export default PositionRow;
