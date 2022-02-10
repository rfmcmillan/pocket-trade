import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import { PieChart, Pie, Tooltip } from "recharts";

const useStyles = makeStyles({
  actual: { marginLeft: 3 },
  pie: {
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
    height: 350,
  },
  target: {
    paddingRight: 3,
  },
});

const AllocationChart = () => {
  const positions = useSelector((state) => state.positions);
  const account = useSelector((state) => state.account);
  const classes = useStyles();
  const tgtPcts = positions.map((position) => {
    return {
      name: position.alpacaData.symbol,
      value: position.tgtPct,
    };
  });

  const currPcts = positions.map((position) => {
    return {
      name: position.alpacaData.symbol,
      value: position.alpacaData.market_value / account.long_market_value,
    };
  });

  return (
    <Paper className={classes.pie}>
      <Grid container direction="column" alignItems="center">
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <Typography variant="h6">Target/Actual Comparison</Typography>
          </Grid>
          <Grid item container>
            <Grid item>
              <Typography className={classes.target} color="secondary">
                Target{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary"> | </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.actual} color="primary">
                {" "}
                Actual
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <PieChart width={600} height={300}>
          <Tooltip wrapperStyle={{ backgroundColor: "primary" }} />
          <Pie
            data={currPcts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={100}
            outerRadius={130}
            fill="#9FE2BF"
            paddingAngle={10}
          />
          <Pie
            data={tgtPcts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            fill="#088F8F"
            paddingAngle={10}
          />
        </PieChart>
      </Grid>
    </Paper>
  );
};

export default AllocationChart;
