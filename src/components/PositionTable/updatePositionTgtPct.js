import React from "react";
import { useDispatch } from "react-redux";
import { updatePosition } from "../../store/positions";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  textField: {
    maxWidth: 100,
  },
});

//This component is a work in progress. It will eventually be used in a dialog for user to edit target allocation for a holding.

const updatePositionTableTgtPct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tgtPct, setTgtPct] = React.useState(0);

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

  return (
    <form onSubmit={onSave}>
      <TextField
        required
        variant="outlined"
        name="tgtPct"
        value={tgtPct}
        onChange={onChange}
        className={classes.textField}
      />
      <Button variant="outlined" type="submit">
        Submit Changes
      </Button>
    </form>
  );
};

export default updatePositionTableTgtPct;
