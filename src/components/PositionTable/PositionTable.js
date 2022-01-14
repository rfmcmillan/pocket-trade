import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import { updatePosition } from "../../store/positions";
import "@fontsource/roboto";
import TargetInput from "./TargetInput";

const useStyles = makeStyles({
  button: { margin: "15px 0px 0px 10px" },
  table: {
    minWidth: 400,
    marginBottom: 20,
    minHeight: 350,
  },
  tableContain: {
    borderRadius: "16px",
  },
  textField: {
    maxWidth: 75,
  },
});

const cancelButtonStyle = {
  margin: "10px",
};
const submitButtonStyle = {
  margin: "10px",
};
const PositionTable = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();
  const { long_market_value } = account;

  const [gld, setGld] = React.useState(0);
  const [vnq, setVnq] = React.useState(0);
  const [vt, setVt] = React.useState(0);
  const [bndw, setBndw] = React.useState(0);

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

  const handleEditButtonClick = () => {
    setEdit(true);
  };
  const determineSymbol = (row) => {
    if (row.symbol === "GLD") {
      return (
        <TextField
          className={classes.textField}
          label={`${(row.tgtPct * 100).toFixed(2)}%`}
          color="primary"
          onChange={onChange}
          name="gld"
          value={gld}
          variant="outlined"
          size="small"
          autoFocus
        >
          Edit
        </TextField>
      );
    } else if (row.symbol === "VNQ") {
      return (
        <TextField
          className={classes.textField}
          label={`${(row.tgtPct * 100).toFixed(2)}%`}
          color="primary"
          onChange={onChange}
          name="vnq"
          value={vnq}
          variant="outlined"
          size="small"
        >
          Edit
        </TextField>
      );
    } else if (row.symbol === "BNDW") {
      return (
        <TextField
          className={classes.textField}
          label={`${(row.tgtPct * 100).toFixed(2)}%`}
          color="primary"
          onChange={onChange}
          name="bndw"
          value={bndw}
          variant="outlined"
          size="small"
        >
          Edit
        </TextField>
      );
    } else if (row.symbol === "VT") {
      return (
        <TextField
          className={classes.textField}
          label={`${(row.tgtPct * 100).toFixed(2)}%`}
          color="primary"
          onChange={onChange}
          name="vt"
          value={vt}
          variant="outlined"
          size="small"
        >
          Edit
        </TextField>
      );
    }
  };

  const onCancel = () => {
    setEdit(false);
  };

  const onChange = (ev) => {
    if (ev.target.name === "gld") {
      setGld(ev.target.value);
    } else if (ev.target.name === "vnq") {
      setVnq(ev.target.value);
    } else if (ev.target.name === "bndw") {
      setBndw(ev.target.value);
    } else if (ev.target.name === "vt") {
      setVt(ev.target.value);
    }
  };

  const onSave = () => {
    positions.forEach((position) => {
      const { id } = position;
      let tgtPct;
      if (position.alpacaData.symbol === "GLD") {
        tgtPct = gld;
      } else if (position.alpacaData.symbol === "VNQ") {
        tgtPct = vnq;
      } else if (position.alpacaData.symbol === "BNDW") {
        tgtPct = bndw;
      } else if (position.alpacaData.symbol === "VT") {
        tgtPct = vt;
      }
      tgtPct = tgtPct / 100;
      dispatch(updatePosition(id, tgtPct));
    });
    setEdit(false);
  };
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position </TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Target</TableCell>
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
                <TableCell>
                  <TargetInput row={row} />
                </TableCell>
                <TableCell align="right">
                  {`${(row.currPct * 100).toFixed(2)}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* {!edit ? (
        <Button
          className={classes.button}
          color="primary"
          onClick={handleEditButtonClick}
          variant="contained"
        >
          Edit Target Allocations
        </Button>
      ) : (
        ""
      )}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        bgcolor="background.paper"
      >
        {edit ? (
          <Button
            style={cancelButtonStyle}
            variant="contained"
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        ) : (
          ""
        )}
        {edit ? (
          <Button
            style={submitButtonStyle}
            variant="contained"
            color="primary"
            onClick={onSave}
          >
            Submit
          </Button>
        ) : (
          ""
        )} */}
      {/* </Box> */}
    </TableContainer>
  );
};

export default PositionTable;
