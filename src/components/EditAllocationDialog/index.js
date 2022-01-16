import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 20,
  },
}));

const EditAllocationDialog = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle id="alert-dialog-title">
          {`Click 'Submit' to place the following trades:`}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <EditAllocationSnackbar />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAllocationDialog;
