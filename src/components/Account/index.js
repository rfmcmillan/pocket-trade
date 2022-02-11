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

const useStyles = makeStyles({
  amount: { fontSize: "2rem" },
  overline: { padding: ".5rem 0rem 0rem 0rem", fontSize: "small" },
});

const Account = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const totalTargetPercentage = useSelector(
    (state) => state.totalTargetPercentage
  );
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
      <Typography className={classes.overline} variant="body1">
        PORTFOLIO VALUE
      </Typography>
      <div>
        <Grid container direction="row" justifyContent="space-around">
          <Grid item xs={10}>
            <Typography className={classes.amount} p={1} color="primary">
              {portfolio_value_usd}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={2}
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Grid item xs={8}>
              {totalTargetPercentage !== 1 ? (
                <Typography>{`Your total target allocation % is off by ${Math.abs(
                  totalTargetPercentage * 100 - 100
                )
                  .toString()
                  .slice(0, 2)}%`}</Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={2}>
              <RebalanceButton p={1} />
            </Grid>
          </Grid>
        </Grid>
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
      </div>
    </div>
  );
};

export default Account;
