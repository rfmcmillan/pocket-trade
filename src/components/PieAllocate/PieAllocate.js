import React from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Box, Grid } from '@material-ui/core';
import {
  PieChart,
  Pie,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

import ActualDonut from './ActualDonut';
import TargetDonut from './TargetDonut';

const useStyles = makeStyles({
  pie: {
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
  },
});

const PieAllocate = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.pie}>
      <Grid container alignItems="center">
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6">Target/Actual Comparison</Typography>
          </Grid>
          <Grid item container>
            <Grid item>
              <Typography color="secondary">Target</Typography>
            </Grid>
            <Grid item>
              <Typography color="secondary">|</Typography>
            </Grid>
            <Grid item>
              <Typography marginLeft={5} color="primary">
                Actual
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ActualDonut />
          <TargetDonut />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PieAllocate;
