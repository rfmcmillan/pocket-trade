import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  contain: {
    padding: 10,
    marginRight: 25,
    height: 480,
  },
});

const PerformanceChart = () => {
  const classes = useStyles();
  const portfolioHistory = useSelector((state) => state.portfolioHistory);
  const { timestamp, equity } = portfolioHistory;

  let data = [];
  if (timestamp) {
    timestamp.forEach((item) => {
      const date = `${dayjs(item * 1000).format("h")}:${dayjs(
        item * 1000
      ).format("mm")}${dayjs(item * 1000).format("A")}`;
      data.push({ timestamp: date });
    });
  }

  if (equity) {
    equity.forEach((item, idx) => {
      data[idx].equity = item;
    });
  }

  return (
    <Paper className={classes.contain}>
      <Typography variant="h6">1 Day Performance</Typography>
      <ResponsiveContainer height="95%" width="100%">
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            horizontal={false}
            vertical={false}
            strokeDasharray="3 3"
          />
          <XAxis tickCount={2} dataKey="timestamp" />
          <YAxis
            tickCount={6}
            tickFormatter={(tick) => {
              return `$${tick.toLocaleString("en-US")}`;
            }}
            domain={[95000, 99000]}
          />
          <Tooltip
            formatter={(value) => {
              return `${value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`;
            }}
          />
          <Legend />
          <Line
            name="Portfolio Value"
            type="monotone"
            dataKey="equity"
            stroke="#088F8F"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PerformanceChart;
