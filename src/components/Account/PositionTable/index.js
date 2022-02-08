import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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

const PositionTable = (props) => {
  const classes = useStyles();
  const [tgtPctsTotal, setTgtPctsTotal] = useState(0);
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const { long_market_value } = account;
  const [currPosition, setCurrPosition] = useState("");
  const { func } = props;

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

  const tgtPcts = positions.map((position) => position.tgtPct);

  const tgtPctsTotalTemp = tgtPcts.reduce((total, curr) => {
    return (total += curr);
  }, 0);

  func(tgtPctsTotalTemp);

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
                  setTgtPctsTotal={setTgtPctsTotal}
                  tgtPctsTotal={tgtPctsTotal}
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
