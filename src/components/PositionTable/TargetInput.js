import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const { row } = props;
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
    setLocalTargetPct(target.value);
  };

  const onSave = () => {
    const localTargetPctFloat = parseFloat(localTargetPct);
    dispatch(updatePosition(row.id, localTargetPctFloat));
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
            value={localTargetPct ? localTargetPct : 0}
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
