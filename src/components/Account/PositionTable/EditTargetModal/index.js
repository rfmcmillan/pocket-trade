import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import TargetInput from "../TargetInput";
import { updatePosition } from "../../../../store/positions";
import { updateTotalTargetPercentageActionCreator } from "../../../../store/totalTargetPercentage";

const useStyles = makeStyles((theme) => ({
  button: { margin: "15px 0px 0px 5px", marginBottom: "16px" },
  root: { display: "inline-block", marginLeft: ".25rem" },
}));

const EditTargetModal = (props) => {
  const dispatch = useDispatch();
  const { row, edit, setEdit, currPosition, setCurrPosition, positions } =
    props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct.toString());
  const totalTargetPercentage = useSelector(
    (state) => state.totalTargetPercentage
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = async () => {
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        color="primary"
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Enter your desired target allocation % below:`}
        </DialogTitle>
        <DialogContent>
          <TargetInput
            row={row}
            edit={edit}
            setEdit={setEdit}
            localTargetPct={localTargetPct}
            setLocalTargetPct={setLocalTargetPct}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <div></div>
          <Button onClick={handleCancel} color="secondary">
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
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditTargetModal.propTypes = {
  tgtPctsTotal: PropTypes.number,
  row: PropTypes.object,
  positions: PropTypes.array,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  currPosition: PropTypes.string,
  setCurrPosition: PropTypes.func,
};

export default EditTargetModal;
