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
import SnackbarRebalance from "./RebalanceSnackbar";
import DialogTable from "./DialogTable";

const useStyles = makeStyles((theme) => ({
  dialogList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderRadius: 20,
  },
}));

const RebalanceDialog = () => {
  const [open, setOpen] = React.useState(false);

  const [proposedOrders, setProposedOrders] = React.useState([]);

  const rebalance = async () => {
    const acctResponse = await axios.get("api/account");
    const account = acctResponse.data;
    const { portfolio_value } = account;
    const posResponse = await axios.get("/api/positions");
    const positions = posResponse.data;
    const proposed = [];
    positions.forEach((position) => {
      const {
        tgtPct,
        currPct,
        alpacaData: { symbol },
      } = position;
      const tgtAmt = tgtPct * portfolio_value;
      const currAmt = currPct * portfolio_value;
      const amount = parseInt(tgtAmt - currAmt);
      const type = "market";
      const time_in_force = "day";
      if (amount > 0) {
        const tradeAmt = amount;
        const side = "buy";
        const order = { symbol, tradeAmt, side, type, time_in_force };
        proposed.push(order);
      } else if (amount < 0) {
        const tradeAmt = -amount;
        const side = "sell";
        const order = { symbol, tradeAmt, side, type, time_in_force };
        proposed.push(order);
      }
    });
    setProposedOrders(proposed);
  };

  const handleClickOpen = async () => {
    await rebalance();
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
        Rebalance
      </Button>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Click 'Submit' to place the following trades:`}
        </DialogTitle>
        <DialogContent>
          <DialogTable proposedOrders={proposedOrders} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <SnackbarRebalance trades={proposedOrders} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RebalanceDialog;
