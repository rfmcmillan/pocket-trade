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
  TextField,
  Button,
  Box,
  Typography,
  Link,
} from '@material-ui/core';
import { updatePosition } from '../../store/positions';
import '@fontsource/roboto';
import updatePositionTableTgtPct from './updatePositionTgtPct';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  textField: {
    maxWidth: 100,
  },
});

const cancelButtonStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  margin: '10px',
};
const submitButtonStyle = {
  background: 'linear-gradient(45deg, darkBlue 30%, darkSlateBlue 90%)',
  margin: '10px',
};
const PositionTable = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const dispatch = useDispatch();
  const { long_market_value } = account;
  const [edit, setEdit] = React.useState(false);

  function createData(position, long_market_value) {
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
    console.log('edit before:', edit);
    setEdit(true);
    console.log('edit:', edit);
  };

  const onCancel = () => {
    setEdit(false);
  };

  // const onSave = () => {
  //   positions.forEach((position) => {
  //     const { id, name, tgtPct, currPct } = position;
  //     console.log('update', position);
  //     //  dispatch(updatePosition({});
  //   });
  //   setEdit(false);
  // };

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
                <TableCell align="right">
                  {!edit ? (
                    <Box>
                      <Typography>{`${row.tgtPct * 100}%`}</Typography>
                      <Link href={`/#/edit-position/${row.id}`} color="primary">
                        Edit
                      </Link>
                    </Box>
                  ) : (
                    <updatePositionTableTgtPct />
                  )}
                </TableCell>
                <TableCell align="right">
                  {`${(row.currPct * 100).toFixed(2)}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!edit ? (
        <Button color="primary" onClick={handleEditButtonClick}>
          Edit Target Allocations
        </Button>
      ) : (
        ''
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
          ''
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
          ''
        )}
      </Box>
    </TableContainer>
  );
};

export default PositionTable;
