import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, useTheme, colors, Box } from '@material-ui/core';

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

const Account = () => {
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
          Here's where your allocations stand today.
        </Typography>
        {/* <Typography variant="h5" gutterBottom>
          {portfolio_value_usd}
        </Typography> */}

        <Box display="flex" flexDirection="row" marginTop={1.5}>
          <PositionTable p={1} />

          <PieAllocate p={1} />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          marginTop={1.5}
          justifyContent="space-between"
        >
          <SimpleLineChart />
          <OrderHistory p={1} />
        </Box>
      </div>
    </div>
  );
};

export default Account;
