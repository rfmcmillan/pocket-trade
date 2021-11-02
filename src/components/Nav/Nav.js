import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LowFrequencyDialog from '../LowFrequencyDialog/LowFrequencyDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Recursive',
  },
  navBar: {
    backgroundColor: '#222B36',
  },
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title} color="primary">
          RapidRebalance
        </Typography>
        <LowFrequencyDialog />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
