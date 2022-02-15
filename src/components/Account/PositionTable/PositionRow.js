import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TableRow, TableCell } from "@material-ui/core";

import EditTargetModal from "./EditTargetModal";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 5px", marginBottom: "16px" },
  cancel: { margin: "10px" },
  cell: { padding: "0px 16px 0px 16px" },
  submit: { margin: "10px" },
  targetPct: { width: "25%" },
  textField: {
    maxWidth: 75,
  },
});

const PositionRow = (props) => {
  const positions = useSelector((state) => state.positions);
  const { row, edit, setEdit, setCurrPosition } = props;
  const [localTargetPct, setLocalTargetPct] = useState(row.tgtPct.toString());
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.cell} component="th" scope="row">
        {row.name}
        <EditTargetModal
          row={row}
          positions={positions}
          edit={edit}
          setEdit={setEdit}
          localTargetPct={localTargetPct}
          setLocalTargetPct={setLocalTargetPct}
          setCurrPosition={setCurrPosition}
        />
      </TableCell>
      <TableCell align="right">{row.symbol}</TableCell>
      <TableCell align="right">
        <Typography>{`${row.tgtPct.toFixed(2)}%`}</Typography>
      </TableCell>
      <TableCell align="right">
        {`${((row.market_value / row.long_market_value) * 100).toFixed(2)}%`}
      </TableCell>
    </TableRow>
  );
};

PositionRow.propTypes = {
  row: PropTypes.object,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  currPosition: PropTypes.string,
  setCurrPosition: PropTypes.func,
  tgtPctsTotal: PropTypes.number,
  setTgtPctsTotal: PropTypes.func,
};

export default PositionRow;
