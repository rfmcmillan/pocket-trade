import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialogList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderRadius: 20,
  },
}));

const SnackbarLowFrequency = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (event) => {
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
        message="Your portfolio rebalancing schedule has been set."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default SnackbarLowFrequency;
