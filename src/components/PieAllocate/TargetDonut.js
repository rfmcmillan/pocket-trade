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
    innerDonut: {
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
        offsetY: -260,
        toolbar: {
          show: false,
        },
      },
      colors: ['#088F8F'],
      dataLabels: { enabled: false },
      stroke: {
        colors: [theme.palette.background.paper],
        show: true,
        width: 8,
      },
      legend: { show: false, position: 'bottom' },
      plotOptions: {
        pie: {
          customScale: 0.63,
          donut: {
            size: '50%',
          },
        },
      },
    },
    series: currPcts,
    labels: ['Vanguard', 'Test', 'Gold', 'Silver'],
  };

  return (
    <div className={classes.innerDonut}>
      <Chart options={chart.options} series={chart.series} type="donut" />
    </div>
  );
};

export default ActualDonut;
