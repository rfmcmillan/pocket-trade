import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
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
  const positions = useSelector((state) => state.positions);
  const account = useSelector((state) => state.account);
  const orders = useSelector((state) => state.orders);
  const [openDialog, setOpenDialog] = useState(false);
  const [proposedOrders, setProposedOrders] = useState([]);
  const mostRecentOrderStatus = orders[0]?.status;

  const rebalancePortfolio = async () => {
    const { long_market_value } = account;
    const proposed = [];
    positions.forEach((position) => {
      const tradeAmount = calculateTradeAmount(position, long_market_value);
      const order = buildOrder(position, tradeAmount);
      proposed.push(order);
    });
    setProposedOrders(proposed);
  };

  const calculateTradeAmount = (position, totalPortfolioValue) => {
    const {
      tgtPct,
      alpacaData: { market_value },
    } = position;

    const tgtAmt = (tgtPct / 100) * totalPortfolioValue;
    return parseInt(tgtAmt - market_value);
  };

  const buildOrder = (position, calculatedTradeAmount) => {
    const {
      alpacaData: { symbol },
    } = position;

    const type = "market";
    const time_in_force = "day";
    let tradeAmt;
    let side;

    if (calculatedTradeAmount > 0) {
      tradeAmt = calculatedTradeAmount;
      side = "buy";
      return { symbol, tradeAmt, side, type, time_in_force };
    } else if (calculatedTradeAmount < 0) {
      tradeAmt = -calculatedTradeAmount;
      side = "sell";
      return { symbol, tradeAmt, side, type, time_in_force };
    }
  };

  const handleClickOpen = async () => {
    await rebalancePortfolio();
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
