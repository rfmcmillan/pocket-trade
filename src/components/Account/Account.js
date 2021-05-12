import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  useTheme,
  colors,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { rebalanceOrders } from '../../store/orders';
import RegularButton from '../CustomButtons/Button';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';
import { Doughnut } from 'react-chartjs-2';
import '@fontsource/roboto';
import dummyPositions from '../../assets/dummyPositions';
import PositionTable from '../PositionTable/PositionTable';
import { createOrder } from '../../store/orders';

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
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  const rebalance = async () => {
    const acctResponse = await axios.get('api/account');
    const account = acctResponse.data;
    const { portfolio_value } = account;
    const posResponse = await axios.get('/api/positions');
    const positions = posResponse.data;
    positions.forEach((position) => {
      const {
        tgtPct,
        currPct,
        alpacaData: { symbol },
      } = position;
      const tgtAmt = tgtPct * portfolio_value;
      const currAmt = currPct * portfolio_value;
      const amtToTrade = parseInt(tgtAmt - currAmt);
      if (amtToTrade > 0) {
        // console.log(`Buy $${amtToTrade} of ${symbol}`);
        dispatch(createOrder(symbol, amtToTrade, 'buy', 'market', 'day'));
      } else if (amtToTrade < 0) {
        // console.log(`Sell $${-amtToTrade} of ${symbol}`);
        const positiveAmtToTrade = -amtToTrade;
        dispatch(
          createOrder(symbol, positiveAmtToTrade, 'sell', 'market', 'day')
        );
      }
    });
    setOpen(true);
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
      <Box
      // sx={{
      //   height: 300,
      //   position: 'relative',
      // }}
      >
        <Doughnut data={data} options={options} />
      </Box>
      <Button variant="outlined" onClick={() => rebalance()}>
        Rebalance
      </Button>
      <Snackbar
        open={open}
        message="Success! Trades submitted!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Account;
