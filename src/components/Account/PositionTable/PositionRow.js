import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TableRow, TableCell } from "@material-ui/core";
import { updatePosition, loadPositions } from "../../../store/positions";
import TargetInput from "./TargetInput";
import { updateTotalTargetPercentageActionCreator } from "../../../store/totalTargetPercentage";

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
  const positions = useSelector((state) => state.positions);
  const { row, edit, setEdit, currPosition, setCurrPosition } = props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct.toString());
  const classes = useStyles();

  const onCancel = () => {
    setCurrPosition(undefined);
  };

  const onChange = (ev) => {
    const { target } = ev;
    setLocalTargetPct(target.value);
  };

  const onSave = () => {
    const localTargetPctFloat = parseFloat(localTargetPct);
    const filtered = positions.filter((position) => {
      return position.id !== row.id;
    });
    const mapped = filtered.map((position) => position.tgtPct);
    const newTgtPcts = [...mapped, localTargetPctFloat];
    const newTotal = newTgtPcts.reduce((sum, curr) => (sum += curr), 0);

    dispatch(updatePosition(row.id, localTargetPctFloat));
    dispatch(updateTotalTargetPercentageActionCreator(newTotal));
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
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={onSave}
            >
              Submit
            </Button>
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
  setTgtPctsTotal: PropTypes.func,
};

export default PositionRow;
