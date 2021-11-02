import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  contain: {
    padding: 10,
    minWidth: 100,
    flexGrow: 1,
    height: '97%',
  },
  lsItem: {
    padding: 8,
    paddingBottom: 0,
  },
});

//This component displays either the Session History or Session Frequency charts
// depending on what is selected from the dropdown menu
const ChartRight = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { sessions } = props;
  //set colors so that the charts are connected to the Mui theme
  const primaryColor = theme.palette.primary.main;
  const errorColor = theme.palette.error.main;

  //Session History Chart
  let seriesMonths = {
    Jan: { successful: 0, failed: 0 },
    Feb: { successful: 0, failed: 0 },
    Mar: { successful: 0, failed: 0 },
    Apr: { successful: 0, failed: 0 },
    May: { successful: 0, failed: 0 },
    Jun: { successful: 0, failed: 0 },
    Jul: { successful: 0, failed: 0 },
    Aug: { successful: 0, failed: 0 },
    Sep: { successful: 0, failed: 0 },
    Oct: { successful: 0, failed: 0 },
    Nov: { successful: 0, failed: 0 },
    Dec: { successful: 0, failed: 0 },
  };

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

  const filtered = sessions.filter((session) => {
    return session.startTime !== null;
  });
  filtered.forEach((session) => {
    const { startTime, successful } = session;
    const month = dayjs(startTime).format('MMM');
    if (successful === true) {
      seriesMonths[month].successful++;
    } else {
      seriesMonths[month].failed++;
    }
  });

  let monthsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthsArr.push(key);
  }
  let monthValsArr = [];
  for (const [key, val] of Object.entries(seriesMonths)) {
    monthValsArr.push(val);
  }

  const monthData = {
    series: [
      {
        name: 'Successful',
        data: monthValsArr.map((val) => {
          return val.successful;
        }),
      },
      {
        name: 'Failed',
        data: monthValsArr.map((val) => {
          return val.failed;
        }),
      },
    ],
    categories: monthsArr,
  };

  const options = {
    colors: [primaryColor, errorColor],
    chart: {
      id: 'basic-line',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: function (val, index) {
          return val.toFixed(0);
        },
      },
    },
  };
  const series = monthData.series;

  return (
    <Paper className={classes.contain} {...props} elevation={10}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography
            className={classes.lsItem}
            variant="h5"
            color="textPrimary"
          >
            Performance History
          </Typography>
        </Grid>
      </Grid>
      {/* <Chart options={options} series={series} type="line" /> */}
    </Paper>
  );
};

export default ChartRight;
