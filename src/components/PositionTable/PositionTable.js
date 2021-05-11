import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
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
  Paper,
} from '@material-ui/core';
import styles from '../../assets/jss/material-kit-react/views/profilePage.js';
import '@fontsource/roboto';
import dummyPositions from '../../assets/dummyPositions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PositionTable = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const { portfolio_value } = account;
  const findEtfName = (symbol) => {
    if (symbol === 'VT') {
      return 'Vanguard Total World Stock ETF';
    } else if (symbol === 'BNDW') {
      return 'Vanguard Total World Bond ETF';
    } else if (symbol === 'VNQ') {
      return 'Vanguard Real Estate ETF';
    } else if (symbol === 'GLD') {
      return 'SPDR Gold Trust ETF';
    }
  };

  function createData(position, portfolio_value) {
    const {
      symbol,
      asset_class,
      qty,
      market_value,
      cost_basis,
      unrealized_pl,
      unrealized_plpc,
      current_price,
      lastday_price,
      change_today,
    } = position;
    const row = {
      symbol,
      asset_class,
      qty,
      market_value,
      cost_basis,
      unrealized_pl,
      unrealized_plpc,
      current_price,
      lastday_price,
      change_today,
    };
    row.currAllocation = (position.market_value * 1) / (portfolio_value * 1);
    row.name = findEtfName(position.symbol);
    return row;
  }

  const rows = dummyPositions.map((position) => {
    return createData(position, portfolio_value);
  });
  console.log('rows:', rows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position </TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Actual (%)</TableCell>
            <TableCell align="right">Target (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            console.log('currAllocation:', row.currAllocation);
            return (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right">{`${
                  row.currAllocation * 100
                }%`}</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PositionTable;
