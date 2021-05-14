import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import dummyPositions from '../../assets/dummyPositions';

const useStyles = makeStyles((theme) => ({
  pie: {
    backgroundColor: '#27C6DB',
  },
}));

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
    return position.currPct;
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
    <PieChart width={730} height={250}>
      <Pie
        data={tgtPcts}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={30}
        outerRadius={50}
        fill="#7783DB"
        className={classes.pie}
        paddingAngle={10}
      />
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        // startAngle={520}
        // endAngle={160}
        innerRadius={60}
        outerRadius={80}
        fill="#27C6DB"
        label
        paddingAngle={10}
      />
    </PieChart>
  );
};

export default PieAllocate;
