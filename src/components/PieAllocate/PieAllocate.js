import React from 'react';
import axios from 'axios';
// import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
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
    // width: 370,
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
    height: 350,
  },
});

const PieAllocate = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.pie}>
      <Grid container direction="column" alignItems="center">
        <Grid container direction="column" alignItems="flex-start">
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
              <Typography color="primary">Actual</Typography>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <TargetDonut />
          <ActualDonut />
        </div>
      </Grid>
    </Paper>
  );
};

export default PieAllocate;
