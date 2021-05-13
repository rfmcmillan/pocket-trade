import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import dummyPositions from '../../assets/dummyPositions';

const PieAllocate = () => {
  const positions = useSelector((state) => state.positions);
  console.log('positions:', positions);
  const tgtPcts = positions.map((position) => {
    return {
      name: position.alpacaData.symbol,
      value: position.tgtPct,
    };
  });

  const currPcts = positions.map((position) => {
    return position.currPct;
  });
  console.log(tgtPcts);
  const marketValues = dummyPositions.map((position) => {
    return position.market_value;
  });

  const data02 = [
    {
      name: 'VT',
      value: 60,
    },
    {
      name: 'BNDW',
      value: 20,
    },
    {
      name: 'VNQ',
      value: 10,
    },
    {
      name: 'GLD',
      value: 10,
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
        outerRadius={50}
        fill="#8884d8"
      />
      <Pie
        data={data02}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
    </PieChart>
  );
};

export default PieAllocate;
