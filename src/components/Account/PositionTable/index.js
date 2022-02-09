import React, { useState } from "react";
import { useSelector } from "react-redux";
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

import PositionRow from "./PositionRow";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    marginBottom: 20,
    minHeight: 350,
  },
  textField: {
    maxWidth: 75,
  },
});

const PositionTable = () => {
  const classes = useStyles();

  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const { long_market_value } = account;
  const [currPosition, setCurrPosition] = useState("");

  function createData(position) {
    const { name, id, alpacaData, tgtPct, currPct } = position;
    const { symbol } = alpacaData;
    const row = {
      id,
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
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Position </TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">Actual</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <PositionRow
                  key={row.id}
                  row={row}
                  currPosition={currPosition}
                  setCurrPosition={setCurrPosition}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PositionTable;
