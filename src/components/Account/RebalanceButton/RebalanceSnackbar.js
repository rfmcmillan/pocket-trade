import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createOrder } from "../../../store/orders";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderRadius: 20,
  },
}));

const RebalanceSnackbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const { trades } = props;

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await trades.forEach((order) => {
      const { symbol, tradeAmt, side, type, time_in_force } = order;
      dispatch(createOrder(symbol, tradeAmt, side, type, time_in_force));
    });

    setOpen(true);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Snackbar
        open={open}
        message="Success! Trades submitted!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

RebalanceSnackbar.propTypes = {
  trades: PropTypes.array,
};

export default RebalanceSnackbar;
