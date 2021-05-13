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
    minWidth: 650,
  },
});

const PositionTable = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const { long_market_value } = account;

  function createData(position, long_market_value) {
    const { name, id, alpacaData, tgtPct, currPct } = position;
    const { symbol } = alpacaData;
    const row = {
      name,
      symbol,
      tgtPct,
      currPct,
    };
    return row;
  }

  const rows = positions.map((position) => {
    return createData(position, long_market_value);
  });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position </TableCell>
            <TableCell align="right">Symbol</TableCell>
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
