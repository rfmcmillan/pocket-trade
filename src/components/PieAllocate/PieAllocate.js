import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
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
import { useDispatch, useSelector } from 'react-redux';
import dummyPositions from '../../assets/dummyPositions';

const useStyles = makeStyles({
  pie: {
    // marginTop: '5px',
    // marginBottom: '15px',
    // marginLeft: '15px',
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
  },
  contain: {},
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
      <Typography variant="h6">Target/Current Comparison</Typography>
      <PieChart width={600} height={300}>
        <Tooltip wrapperStyle={{ backgroundColor: 'primary' }} />

        <Pie
          data={currPcts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="110%"
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
          cy="110%"
          innerRadius={60}
          outerRadius={90}
          fill="#088F8F"
          // className={classes.pie}
          paddingAngle={10}
        />
        <Legend
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
        />
      </PieChart>
    </Paper>
  );
};

export default PieAllocate;
