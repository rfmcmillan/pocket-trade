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

const DialogTable = () => {
  const classes = useStyles();
  const { proposedOrders } = props;

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
            <TableCell>Order </TableCell>
            <TableCell align="right">Buy/Sell</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Actual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{`${row.tgtPct * 100}%`}</TableCell>
                <TableCell align="right">{`${(row.currPct * 100).toFixed(
                  2
                )}%`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PositionTable;
