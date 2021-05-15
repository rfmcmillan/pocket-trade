import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import '@fontsource/roboto';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const FutureOrders = (props) => {
  const classes = useStyles();
  const { proposedOrders } = props;
  console.log(proposedOrders);
  function createData(order) {
    const { side, tradeAmt, symbol } = order;
    const row = {
      side,
      tradeAmt,
      symbol,
    };
    return row;
  }

  const rows = proposedOrders.map((order) => {
    return createData(order);
  });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol </TableCell>
            <TableCell>Buy/Sell</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.side.toUpperCase()}</TableCell>
                <TableCell>{`$${row.tradeAmt}.00`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FutureOrders;