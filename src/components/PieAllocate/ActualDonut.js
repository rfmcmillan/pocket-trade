import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import dummyPositions from '../../assets/dummyPositions';
import TargetDonut from './TargetDonut';

const ActualDonut = (props) => {
  const positions = useSelector((state) => state.positions);
  const theme = useTheme();
  const useStyles = makeStyles({
    donut: {
      width: 350,
    },
  });
  const classes = useStyles();

  const currPcts = positions.map((position) => {
    return position.currPct;
  });

  const chart = {
    options: {
      chart: {
        offsetY: -268,
        toolbar: {
          show: false,
        },
      },
      colors: ['#9FE2BF'],
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return `${val.toFixed(2)}%`;
        },
      },
      labels: ['GLD', 'VNQ', 'BNDW', 'VT'],
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
      tooltip: { enabled: false },
      legend: { show: false, position: 'bottom' },
    },
    series: currPcts,
  };
  console.log('currPcts:', currPcts);
  return (
    <div className={classes.donut}>
      <Chart options={chart.options} series={chart.series} type="donut" />
    </div>
  );
};

export default ActualDonut;
