import React from 'react';
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
    return position.tgtPct;
  });

  const chart = {
    options: {
      chart: {
        offsetY: -14,
        toolbar: {
          show: false,
        },
      },
      colors: ['#088F8F'],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          customScale: 0.63,
          donut: {
            size: '50%',
          },
        },
      },
      stroke: {
        colors: [theme.palette.background.paper],
        show: true,
        width: 8,
      },
      tooltip: { enabled: true },
      legend: { show: false, position: 'bottom' },
    },
    series: tgtPcts,
    labels: ['Vanguard', 'Test', 'Gold', 'Silver'],
  };
  return <div className={classes.innerDonut}></div>;
};

export default ActualDonut;
