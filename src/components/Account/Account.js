import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  useTheme,
  colors,
  Box,
  Snackbar,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';
import { Doughnut } from 'react-chartjs-2';
import '@fontsource/roboto';
import dummyPositions from '../../assets/dummyPositions';
import PositionTable from '../PositionTable/PositionTable';
import OrderHistory from '../OrderHistory/OrderHistory';
import { createOrder } from '../../store/orders';
import PieAllocate from '../PieAllocate/PieAllocate';
import DialogRebalance from '../DialogRebalance/DialogRebalance';

const useStyles = makeStyles(styles);

const Account = () => {
  const classes = useStyles({
    table: {
      minWidth: 650,
    },
  });
  const [open, setOpen] = React.useState(false);
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();

  const { portfolio_value } = account;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const portfolio_value_usd = formatter.format(portfolio_value);

  const marketValues = dummyPositions.map((position) => {
    return position.market_value;
  });

  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: marketValues,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ['Global Stocks', 'Global Bonds', 'Real Estate', 'Gold'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      // intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <div id="account">
      <div>
        <Typography variant="h4" component="h4" gutterBottom>
          Your Account
        </Typography>
        <Typography variant="h5" gutterBottom>
          {portfolio_value_usd}
        </Typography>
        <PositionTable />
      </div>
      <PieAllocate />
      <DialogRebalance />
      <OrderHistory />
    </div>
  );
};

export default Account;
