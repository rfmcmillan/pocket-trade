import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import SubmitButton from "./SubmitButton";
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

const RebalanceButton = () => {
  const totalTargetPercentage = useSelector(
    (state) => state.totalTargetPercentage
  );
  console.log(
    "🚀 ~ file: index.js ~ line 31 ~ RebalanceButton ~ totalTargetPercentage",
    totalTargetPercentage
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [proposedOrders, setProposedOrders] = useState([]);

  const orders = useSelector((state) => state.orders);
  const mostRecentOrderStatus = orders[0]?.status;

  const rebalance = async () => {
    const acctResponse = await axios.get("api/account");
    const account = acctResponse.data;
    const { long_market_value } = account;
    const posResponse = await axios.get("/api/positions");
    const positions = posResponse.data;
    const proposed = [];
    positions.forEach((position) => {
      const {
        tgtPct,

        alpacaData: { symbol, market_value },
      } = position;

      const tgtAmt = (tgtPct / 100) * long_market_value;
      const amount = parseInt(tgtAmt - market_value);
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
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.button}
        color="primary"
        disabled={
          totalTargetPercentage === 100 &&
          mostRecentOrderStatus !== "accepted" &&
          mostRecentOrderStatus !== "new"
            ? false
            : true
        }
        onClick={handleClickOpen}
        variant="contained"
      >
        Rebalance
      </Button>

      <Dialog
        open={openDialog}
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
          <SubmitButton trades={proposedOrders} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

RebalanceButton.propTypes = {
  tgtPctsTotal: PropTypes.number,
};

export default RebalanceButton;
