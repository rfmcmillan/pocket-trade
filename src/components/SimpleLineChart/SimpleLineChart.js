import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';
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

const data2 = {
  series: [
    {
      name: 'GLD',
      data: [
        167.05, 185.05, 186.99, 178.71, 177.45, 169.75, 181.97, 175.02, 163.02,
        161.55, 167.61,
      ],
    },
    {
      name: 'VNQ',
      data: [
        78.8, 81.42, 81.47, 79.27, 77.4, 84.96, 85.19, 85.48, 88.87, 92.34,
        96.45,
      ],
    },
    {
      name: 'BNDW',
      data: [
        81.32, 82.38, 81.53, 81.59, 81.66, 81.87, 82.12, 81.51, 80.03, 79.75,
        79.59,
      ],
    },
    {
      name: 'VT',
      data: [
        75.03, 79.29, 83.68, 81.26, 79.86, 89.9, 93.44, 93.41, 96.14, 97.93,
        101.95,
      ],
    },
    // { name: '2020-07-01', gld: 167.05, vnq: 78.8, bndw: 81.32, vt: 75.03 },
    // { name: '2020-08-01', gld: 185.05, vnq: 81.42, bndw: 82.38, vt: 79.29 },
    // { name: '2020-09-01', gld: 186.99, vnq: 81.47, bndw: 81.53, vt: 83.68 },
    // { name: '2020-10-01', gld: 178.71, vnq: 79.27, bndw: 81.59, vt: 81.26 },
    // { name: '2020-11-01', gld: 177.45, vnq: 77.4, bndw: 81.66, vt: 79.86 },
    // { name: '2020-12-01', gld: 169.75, vnq: 84.96, bndw: 81.87, vt: 89.9 },
    // { name: '2021-01-01', gld: 181.97, vnq: 85.19, bndw: 82.12, vt: 93.44 },
    // { name: '2021-02-01', gld: 175.02, vnq: 85.48, bndw: 81.51, vt: 93.41 },
    // { name: '2021-03-01', gld: 163.02, vnq: 88.87, bndw: 80.03, vt: 96.14 },
    // { name: '2021-04-01', gld: 161.55, vnq: 92.34, bndw: 79.75, vt: 97.93 },
    // { name: '2021-05-01', gld: 167.61, vnq: 96.45, bndw: 79.59, vt: 101.95 },
  ],
  categories: [
    '07/01/20',
    '08/01/20',
    '09/01/20',
    '10/01/20',
    '11/01/20',
    '12/01/20',
    '01/01/21',
    '02/01/21',
    '03/01/21',
    '04/01/21',
    '05/01/21',
  ],
};

const useStyles = makeStyles({
  contain: {
    padding: 10,
    // paddingBottom: 20,
    marginRight: 25,
    height: 480,
  },
});

const options = {
  colors: ['#088F8F', '#27C6DB', '#9FE2BF', '#82ca9d'],
  chart: {
    id: 'basic-line',
  },
  legend: {
    labels: {
      colors: ['white'],
    },
  },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    theme: true,
  },

  stroke: {
    curve: 'smooth',
    width: 2,
  },

  xaxis: {
    categories: [
      '07/01/20',
      '08/01/20',
      '09/01/20',
      '10/01/20',
      '11/01/20',
      '12/01/20',
      '01/01/21',
      '02/01/21',
      '03/01/21',
      '04/01/21',
      '05/01/20',
    ],
    labels: {
      style: {
        colors: 'white',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: 'white',
      },
      formatter: function (val, index) {
        return val.toFixed(2);
      },
    },
  },
};

const series = data2.series;

const SimpleLineChart = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Paper className={classes.contain}>
      <Typography variant="h6">Historical Performance</Typography>
      {/* <ResponsiveContainer height="95%" width="100%"> */}
      {/* <Chart options={options} series={series} type="line" /> */}
      {/* </ResponsiveContainer> */}
    </Paper>
  );
};

export default SimpleLineChart;
