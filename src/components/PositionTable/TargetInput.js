import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import { updatePosition } from "../../store/positions";
import "@fontsource/roboto";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 10px" },
  textField: {
    maxWidth: 75,
  },
});

const TargetInput = (props) => {
  const { row } = props;
  console.log("row:", row);
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct);
  const [edit, setEdit] = React.useState(false);
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
    console.log("target:", target);
    setLocalTargetPct(target.value);
  };

  const onSave = () => {
    // positions.forEach((position) => {
    //   const { id } = position;
    //   let tgtPct;
    //   if (position.alpacaData.symbol === "GLD") {
    //     tgtPct = gld;
    //   } else if (position.alpacaData.symbol === "VNQ") {
    //     tgtPct = vnq;
    //   } else if (position.alpacaData.symbol === "BNDW") {
    //     tgtPct = bndw;
    //   } else if (position.alpacaData.symbol === "VT") {
    //     tgtPct = vt;
    //   }
    //   tgtPct = tgtPct / 100;
    //   dispatch(updatePosition(id, tgtPct));
    // });
    setEdit(false);
  };
  return (
    <div>
      {!edit ? (
        <Box>
          <Typography>{`${(row.tgtPct * 100).toFixed(2)}%`}</Typography>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleEditButtonClick}
            variant="contained"
          >
            Edit
          </Button>
        </Box>
      ) : (
        <div>
          <TextField
            className={classes.textField}
            label={`${(row.tgtPct * 100).toFixed(2)}%`}
            color="primary"
            onChange={onChange}
            name={row.symbol}
            value={localTargetPct}
            variant="outlined"
            size="small"
          ></TextField>
          {edit ? (
            <Button
              style={cancelButtonStyle}
              variant="contained"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          ) : (
            ""
          )}
          {edit ? (
            <Button
              style={submitButtonStyle}
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
    </div>
  );
};

export default TargetInput;
