import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    const { classes, isAuthenticated, logInClickOpen } = this.props;

    return (
      <AppBar className={classes.color}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.link}>
            <Typography variant="title" color="inherit">
              React Blog App
            </Typography>
          </Link>
          <div>
            <Link to="/" className={classes.link}>
              <Button className={classes.button}>All Posts</Button>
            </Link>
            <Link to="/create" className={classes.link}>
              <Button
                className={classes.button}
                onClick={isAuthenticated ? () => {} : logInClickOpen}
              >
                Create Post
              </Button>
            </Link>
            <Link to="/login" className={classes.link}>
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
