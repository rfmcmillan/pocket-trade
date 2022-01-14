import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TableRow, TableCell } from "@material-ui/core";
import { updatePosition } from "../../store/positions";
import "@fontsource/roboto";
import TargetInput from "./TargetInput";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 10px" },
  targetPct: { width: "25%" },
  textField: {
    maxWidth: 75,
  },
});

const PositionRow = (props) => {
  const dispatch = useDispatch();
  const { row, edit, setEdit, currPosition, setCurrPosition } = props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct);

  const classes = useStyles();

  const cancelButtonStyle = {
    margin: "10px",
  };
  const submitButtonStyle = {
    margin: "10px",
  };

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const onCancel = () => {
    setEdit(false);
  };

  const onChange = (ev) => {
    const { target } = ev;

    console.log(
      "🚀 ~ file: PositionRow.js ~ line 43 ~ onChange ~ target.value",
      target.value
    );

    setLocalTargetPct(target.value);
  };

  const onSave = () => {
    console.log(
      "🚀 ~ file: PositionRow.js ~ line 48 ~ onSave ~ localTargetPct",
      localTargetPct
    );
    const localTargetPctFloat = parseFloat(localTargetPct);

    console.log(
      "🚀 ~ file: TargetInput.js ~ line 48 ~ onSave ~ localTargetPctFloat",
      localTargetPctFloat
    );

    dispatch(updatePosition(row.id, localTargetPctFloat));
    setCurrPosition({});
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {row.name}
        {currPosition !== row.symbol ? (
          <Button
            className={classes.button}
            color="primary"
            onClick={() => {
              console.log("row:", row);
              setCurrPosition(row.symbol);
              console.log(currPosition);
            }}
          >
            Edit
          </Button>
        ) : (
          <div>
            <Button
              style={cancelButtonStyle}
              variant="contained"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              style={submitButtonStyle}
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

export default PositionRow;
