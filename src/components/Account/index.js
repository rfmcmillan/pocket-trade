import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "@fontsource/roboto";
import PositionTable from "./PositionTable";
import OrderHistory from "./OrderHistory/OrderHistory";
import PieAllocate from "./AllocationChart";
import RebalanceButton from "./RebalanceButton";
import PerformanceChart from "./PerformanceChart";
import { updateTotalTargetPercentageActionCreator } from "../../store/totalTargetPercentage";

const useStyles = makeStyles({ amount: { fontSize: "2rem" } });

const Account = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const classes = useStyles();
  const { portfolio_value } = account;
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const portfolio_value_usd = formatter.format(portfolio_value);

  useEffect(() => {
    const mapped = positions.map((position) => position.tgtPct);
    const totalTargetPercentages = mapped.reduce(
      (sum, curr) => (sum += curr),
      0
    );
    dispatch(updateTotalTargetPercentageActionCreator(totalTargetPercentages));
  }, [positions]);

  return (
    <div id="account">
      <Typography variant="overline">PORTFOLIO VALUE</Typography>
      <Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography className={classes.amount} p={1} color="primary">
            {portfolio_value_usd ? portfolio_value_usd : "$100,000.00"}
          </Typography>
          <RebalanceButton p={1} />
        </Box>
        <Typography p={1} variant="subtitle1">
          Here&apos;s where your portfolio stands today.
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          marginTop={1.5}
        >
          <Grid item xs={10}>
            <PositionTable />
          </Grid>
          <PieAllocate />
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <PerformanceChart />
          </Grid>
          <Grid item xs={6}>
            <OrderHistory p={1} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Account;
