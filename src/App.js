import React, { Component } from 'react';
import withRoot from './withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CameraIcon from '@material-ui/icons/CameraTwoTone';
import IconButton from '@material-ui/core/IconButton';

import Cronus from './Cronus'

const styles = theme => ({
  app: {

  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 2,
  },
  beta: {
    marginLeft: 2,
    flexGrow: 1,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <CameraIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="inherit"
                className={classes.title}
              >
                Cronus
              </Typography>
              <Typography
                variant="overline"
                color="inherit"
                className={classes.beta}
                noWrap
              >
                Beta
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.root}>
          <Cronus />
        </div>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));