import React, { PureComponent } from 'react';
import axios from 'axios';
const { alpha_vantage_key } = require('../../../env.js');
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

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  { name: '2021-04-12', value: 162.28 },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const gld = [
  { name: '2020-06-01', value: 162.92 },
  { name: '2020-07-01', value: 167.05 },
  { name: '2020-08-01', value: 185.05 },
  { name: '2020-09-01', value: 186.99 },
  { name: '2020-10-01', value: 178.71 },
  { name: '2020-11-01', value: 177.45 },
  { name: '2020-12-01', value: 169.75 },
  { name: '2021-01-01', value: 181.97 },
  { name: '2021-02-01', value: 175.02 },
  { name: '2021-03-01', value: 163.02 },
  { name: '2021-04-01', value: 161.55 },
  { name: '2021-05-01', value: 167.61 },
];

export default class SimpleLineChart extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="50%" height="50%">
        <LineChart
          width={500}
          height={300}
          data={gld}
          margin={{
            top: 5,
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
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
