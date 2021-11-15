import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, loadOrders } from '../../store/orders';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Divider,
  ListItemText,
  Snackbar,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  dialogList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderRadius: 20,
  },
}));

const SnackbarRebalance = (props) => {
  const [open, setOpen] = React.useState(false);
  const { trades } = props;

  const dispatch = useDispatch();

  const rebalance = async () => {
    const acctResponse = await axios.get('api/account');
    const account = acctResponse.data;
    const { portfolio_value } = account;
    const posResponse = await axios.get('/api/positions');
    const positions = posResponse.data;
    const proposed = [];
    positions.forEach((position) => {
      const {
        tgtPct,
        currPct,
        alpacaData: { symbol },
      } = position;
      const tgtAmt = tgtPct * portfolio_value;
      const currAmt = currPct * portfolio_value;
      const amount = parseInt(tgtAmt - currAmt);
      const type = 'market';
      const time_in_force = 'day';
      if (amount > 0) {
        const tradeAmt = amount;
        const side = 'buy';
        const order = { symbol, tradeAmt, side, type, time_in_force };
        proposed.push(order);
        // dispatch(createOrder(symbol, amtToTrade, 'buy', 'market', 'day'));
      } else if (amount < 0) {
        const tradeAmt = -amount;
        const side = 'sell';
        const order = { symbol, tradeAmt, side, type, time_in_force };
        proposed.push(order);
        // dispatch(
        //   createOrder(symbol, positiveAmtToTrade, 'sell', 'market', 'day')
        // );
      }
    });
    setProposedOrders(proposed);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await trades.forEach((order) => {
      const { symbol, tradeAmt, side, type, time_in_force } = order;
      dispatch(createOrder(symbol, tradeAmt, side, type, time_in_force));
    });

    setOpen(true);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Snackbar
        open={open}
        message="Success! Trades submitted!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default SnackbarRebalance;
