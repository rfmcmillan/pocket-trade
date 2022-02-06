import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "@fontsource/roboto";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const DialogTable = (props) => {
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
                <TableCell>{`$${row.tradeAmt.toLocaleString(
                  "en-US"
                )}.00`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DialogTable.propTypes = { proposedOrders: PropTypes.array };

export default DialogTable;
