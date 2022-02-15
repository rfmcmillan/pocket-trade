import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import TargetInput from "../TargetInput";
import { updatePosition } from "../../../../store/positions";
import { updateTotalTargetPercentageActionCreator } from "../../../../store/totalTargetPercentage";

const useStyles = makeStyles(() => ({
  button: { margin: "15px 0px 15px 5px" },
  dialog: { width: 500 },
  prompt: { marginBottom: "2rem", textAlign: "center", width: 350 },
  promptGrid: { minWidth: 350 },
  root: { display: "inline-block", marginLeft: ".25rem" },
  submit: { borderRadius: 20 },
  symbol: { fontSize: "1rem" },
  title: { textAlign: "center" },
  titleGrid: { minWidth: 400 },
  titleText: { fontSize: "1.5rem" },
}));

const EditTargetModal = (props) => {
  const dispatch = useDispatch();
  const { row, edit, setEdit, setCurrPosition, positions } = props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct);
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
    setOpenDialog(false);
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
        <DialogTitle className={classes.title} id="alert-dialog-title">
          <Grid container direction="column" alignItems="center">
            <Grid className={classes.titleGrid} item xs={6}>
              <Typography variant="h1" className={classes.titleText}>
                {row.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h2"
                className={classes.symbol}
                color="primary"
              >
                {row.symbol}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container direction="column" alignItems="center">
            <Grid className={classes.promptGrid} item xs={6}>
              <Typography className={classes.prompt} variant="body1">
                Please enter your desired target allocation % below:
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TargetInput
                row={row}
                edit={edit}
                setEdit={setEdit}
                localTargetPct={localTargetPct}
                setLocalTargetPct={setLocalTargetPct}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={localTargetPct ? false : true}
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
