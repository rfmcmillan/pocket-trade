import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

const data2 = [
  { name: '2020-07-01', gld: 167.05, vnq: 78.8, bndw: 81.32, vt: 75.03 },
  { name: '2020-08-01', gld: 185.05, vnq: 81.42, bndw: 82.38, vt: 79.29 },
  { name: '2020-09-01', gld: 186.99, vnq: 81.47, bndw: 81.53, vt: 83.68 },
  { name: '2020-10-01', gld: 178.71, vnq: 79.27, bndw: 81.59, vt: 81.26 },
  { name: '2020-11-01', gld: 177.45, vnq: 77.4, bndw: 81.66, vt: 79.86 },
  { name: '2020-12-01', gld: 169.75, vnq: 84.96, bndw: 81.87, vt: 89.9 },
  { name: '2021-01-01', gld: 181.97, vnq: 85.19, bndw: 82.12, vt: 93.44 },
  { name: '2021-02-01', gld: 175.02, vnq: 85.48, bndw: 81.51, vt: 93.41 },
  { name: '2021-03-01', gld: 163.02, vnq: 88.87, bndw: 80.03, vt: 96.14 },
  { name: '2021-04-01', gld: 161.55, vnq: 92.34, bndw: 79.75, vt: 97.93 },
  { name: '2021-05-01', gld: 167.61, vnq: 96.45, bndw: 79.59, vt: 101.95 },
];

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 850,
  },
});
const SimpleLineChart = () => {
  // static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
  const classes = useStyles();
  return (
    <Paper className={classes.contain}>
      <Typography variant="h6">Historical Performance</Typography>
      <LineChart
        width={970}
        height={500}
        data={data2}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[165, 180]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="gld"
          stroke="#088F8F"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="vnq" stroke="#27C6DB" />
        <Line type="monotone" dataKey="bndw" stroke="#9FE2BF" />
        <Line type="monotone" dataKey="vt" stroke="#82ca9d" />
      </LineChart>
    </Paper>
  );
};

export default SimpleLineChart;
