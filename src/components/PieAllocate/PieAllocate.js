import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
import dummyPositions from '../../assets/dummyPositions';

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
  const positions = useSelector((state) => state.positions);
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
      value: position.currPct,
    };
  });

  const marketValues = dummyPositions.map((position) => {
    return position.market_value;
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
        {/* <div>
          <TargetDonut />
          <ActualDonut />
        </div> */}
        <PieChart width={600} height={300}>
          <Tooltip wrapperStyle={{ backgroundColor: 'primary' }} />

          <Pie
            data={currPcts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            // startAngle={520}
            // endAngle={160}
            innerRadius={100}
            outerRadius={130}
            fill="#9FE2BF"
            paddingAngle={10}
            label
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
            // className={classes.pie}
            paddingAngle={10}
          />
          {/* <Legend
          width={100}
          align="left"
          iconType="line"
          // wrapperStyle={{
          //   top: 40,
          //   left: 110,
          //   backgroundColor: '#f5f5f5',
          //   border: '1px solid #d5d5d5',
          //   borderRadius: 3,
          //   lineHeight: '40px',
          // }}
        /> */}
        </PieChart>
      </Grid>
    </Paper>
  );
};

export default PieAllocate;
