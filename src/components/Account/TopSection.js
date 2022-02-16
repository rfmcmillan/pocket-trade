import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import "@fontsource/roboto";
import RebalanceButton from "./RebalanceButton";

const useStyles = makeStyles({
  alert: { marginRight: "1rem" },
  alertItemGrid: { padding: 0 },
  alertGrid: { margin: 0 },
  amount: { fontSize: "2rem" },
  header: {},
  overline: { padding: ".5rem 0rem 0rem 0rem", fontSize: "small" },
});

const TopSection = () => {
  const account = useSelector((state) => state.account);
  const orders = useSelector((state) => state.orders);
  const totalTargetPercentage = useSelector(
    (state) => state.totalTargetPercentage
  );
  const [alertText, setAlertText] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [pendingTrades, setPendingTrades] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(account.portfolio_value);
  const classes = useStyles();

  useEffect(() => {
    if (totalTargetPercentage !== 100) {
      setAlertText(determineAlert(totalTargetPercentage));
      setDisplayAlert(true);
    } else if (pendingTrades === true) {
      setAlertText(
        "Please wait until all pending trades have been filled before you rebalance again."
      );
      setDisplayAlert(true);
    } else {
      setDisplayAlert(false);
    }
  }, [totalTargetPercentage, pendingTrades]);

  useEffect(() => {
    const mostRecentOrder = orders[0];
    if (mostRecentOrder) {
      if (mostRecentOrder.status !== "filled") {
        setPendingTrades(true);
      }
    }
  }, [orders]);

  const determineAlert = (totalTargetPercentage) => {
    if (totalTargetPercentage > 100) {
      return `Your total target allocation is off by ${parseInt(
        Math.round(totalTargetPercentage - 100)
      )}%`;
    } else if (totalTargetPercentage < 100) {
      return `Your total target allocation is off by -${Math.abs(
        totalTargetPercentage - 100
      )
        .toString()
        .slice(0, 2)}%`;
    }
  };

  return (
    <Grid
      className={classes.header}
      container
      direction="row"
      justifyContent="space-between"
    >
      <Grid item xs={5} xl={7}>
        <Typography className={classes.amount} p={1} color="primary">
          {portfolioValue}
        </Typography>
      </Grid>
      <Grid
        className={classes.alertGrid}
        item
        container
        xs={7}
        xl={5}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid className={classes.alertItemGrid} item xs={10}>
          {displayAlert ? (
            <Alert
              className={classes.alert}
              elevation={6}
              variant="filled"
              severity="error"
            >
              {alertText}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={2}>
          <RebalanceButton p={1} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopSection;
