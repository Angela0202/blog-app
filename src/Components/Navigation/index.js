import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    const { classes, isAuthenticated, logInClickOpen, onLogOut } = this.props;

    return (
      <AppBar color={'default'}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit">
            React Blog App
          </Typography>
          <div>
            <Link to="/">
              <Button className={classes.button}>All Posts</Button>
            </Link>
            <Link to="/create">
              <Button className={classes.button}>Create Post</Button>
            </Link>
            <Link to="/login">
              {
                !isAuthenticated ? (
                  <Button
                    className={classes.button}
                    onClick={logInClickOpen}
                  >Log In</Button>
                ) : (
                  <Button
                    className={classes.button}
                    onClick={logInClickOpen}
                  >Log Out</Button>
                )
              }
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navigation);
