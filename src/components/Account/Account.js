import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  useTheme,
  colors,
  Box,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import '@fontsource/roboto';
import dummyPositions from '../../assets/dummyPositions';
import PositionTable from '../PositionTable/PositionTable';
import OrderHistory from '../OrderHistory/OrderHistory';
import { createOrder } from '../../store/orders';
import PieAllocate from '../PieAllocate/PieAllocate';
import DialogRebalance from '../DialogRebalance/DialogRebalance';
import SimpleLineChart from '../SimpleLineChart/SimpleLineChart';
import SimplePieChart from '../SimplePieChart/SimplePieChart';

const useStyles = makeStyles({
  bottomRow: {},
});

const Account = () => {
  const [open, setOpen] = React.useState(false);
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();
  const classes = useStyles();

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

  return (
    <div id="account">
      <Typography variant="overline">PORTFOLIO VALUE</Typography>
      <div>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography p={1} variant="h4" component="h4" color="primary">
            {portfolio_value_usd}
          </Typography>
          <DialogRebalance p={1} />
        </Box>
        <Typography p={1} variant="subtitle1">
          Here's where your portfolio stands today.
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          marginTop={1.5}
        >
          <Grid item xs={10}>
            <PositionTable />
          </Grid>

          <PieAllocate />
        </Box>

        <Grid container className={classes.bottomRow}>
          {' '}
          <Grid item xs={6}>
            <SimpleLineChart />
          </Grid>
          <Grid item xs={6}>
            <OrderHistory p={1} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
