import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

const OrderHistory = () => {
  const orders = useSelector((state) => state.orders);
  const classes = useStyles({
    table: {
      minWidth: 650,
    },
  });
  function createData(order) {
    const {
      symbol,
      type,
      side,
      created_at,
      filled_avg_price,
      filled_qty,
      notional,
      status,
    } = order;

    const row = {
      symbol,
      type,
      side,
      created_at,
      filled_avg_price,
      filled_qty,
      notional,
      status,
    };
    return row;
  }

  const rows = orders.map((order) => {
    return createData(order);
  });

  return (
    <Paper elevation={3}>
      <Typography variant="h6" className={classes.title}>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Position </TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell>Price/Share</TableCell>
              <TableCell>Total $</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell>
                  <TableCell>
                    {row.type} {row.side} {row.created_at}
                  </TableCell>
                  <TableCell>{(row.filled_qty * 1).toFixed(2)}</TableCell>
                  <TableCell>{row.filled_avg_price}</TableCell>
                  <TableCell>{row.notional}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderHistory;
