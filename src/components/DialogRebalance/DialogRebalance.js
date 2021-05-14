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
} from '@material-ui/core';
import DialogList from './DialogList';
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

const DialogRebalance = () => {
  const [open, setOpen] = React.useState(false);

  const [proposedOrders, setProposedOrders] = React.useState([]);
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

  const handleClickOpen = async () => {
    await rebalance();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log('upon clicking submit: proposedOrders:', proposedOrders);
    await proposedOrders.forEach((order) => {
      const { symbol, tradeAmt, side, type, time_in_force } = order;
      dispatch(createOrder(symbol, tradeAmt, side, type, time_in_force));
    });
    await dispatch(loadOrders());
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Quick Rebalance
      </Button>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Click 'Submit' to place the following trades:`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <List
              component="nav"
              aria-label="main mailbox folders"
              className={classes.dialogList}
            >
              {proposedOrders.map((order, idx) => {
                const { side, tradeAmt, symbol } = order;
                return (
                  <ListItem key={idx}>
                    {side} {tradeAmt} shares of {symbol}
                    <Divider />
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogRebalance;
