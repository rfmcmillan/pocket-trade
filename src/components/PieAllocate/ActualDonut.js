import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import dummyPositions from '../../assets/dummyPositions';

const ActualDonut = (props) => {
  const positions = useSelector((state) => state.positions);
  const theme = useTheme();
  const useStyles = makeStyles({
    donut: {
      width: 350,
    },
  });
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

  const chart = {
    options: {
      chart: {
        offsetY: 50,
        toolbar: {
          show: false,
        },
        stacked: true,
      },
      colors: ['#9FE2BF'],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          customScale: 1,
        },
      },
      stroke: {
        colors: [theme.palette.background.paper],
        show: true,
        width: 5,
      },
      legend: { show: false, position: 'bottom' },
    },
    series: currPcts,
    labels: ['Vanguard', 'Test', 'Gold', 'Silver'],
  };

  return (
    <div className={classes.donut}>
      <Chart options={chart.options} series={chart.series} type="donut" />
    </div>
  );
};

export default ActualDonut;
