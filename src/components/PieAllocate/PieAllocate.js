import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { PieChart, Pie, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import dummyPositions from '../../assets/dummyPositions';

const useStyles = makeStyles({
  pie: {
    // marginTop: '5px',
    // marginBottom: '15px',
    // marginLeft: '15px',
    marginBottom: 20,
    marginLeft: 20,
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
    return { name: position.alpacaData.symbol, value: position.currPct };
  });

  const marketValues = dummyPositions.map((position) => {
    return position.market_value;
  });

  const data02 = [
    {
      name: 'GLD',
      value: 10,
    },
    {
      name: 'VNQ',
      value: 10,
    },
    {
      name: 'BNDW',
      value: 20,
    },
    {
      name: 'VT',
      value: 60,
    },
  ];

  return (
    <Paper className={classes.pie}>
      <PieChart width={600} height={300}>
        <Pie
          data={currPcts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          // startAngle={520}
          // endAngle={160}
          innerRadius={100}
          outerRadius={130}
          fill="#27C6DB"
          paddingAngle={10}
          label
        />
        <Pie
          data={tgtPcts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#7783DB"
          // className={classes.pie}
          paddingAngle={10}
        />
      </PieChart>
    </Paper>
  );
};

export default PieAllocate;
