import React, { Component } from 'react';

import Navigation from '../Navigation';
import Authentication from '../Authentication';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      open: false
    }
  }

  logInClickOpen = () => {
    this.setState({ open: true });
  };

  LogInDialogClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, open } = this.state;

    return (
      <Router>
        <div>
          <Navigation
            isAuthenticated={isAuthenticated}
            logInClickOpen={this.logInClickOpen}
          />
          <Switch>
            <Route exact path="/" render={() => <h1>Posts</h1>} />
            <Route
              path="/create"
              render={() => (
                <h1>
                  Create Post
                  <div className={classes.div}>
                    <Button component={Link} to="/blog/post">
                      button
                    </Button>
                  </div>
                  <div className={classes.div}>
                    <Button component={Link} to="/blog/post">
                      button
                    </Button>
                  </div>
                  <div className={classes.div}>
                    <Button component={Link} to="/blog/post">
                      button
                    </Button>
                  </div>
                </h1>
              )}
            />
            <Route
              to="/login"
              render={props=>
                <Authentication
                  {...props}
                  isOpen={open}
                  isAuthenticated={isAuthenticated}
                  onLogInDialogClose={this.LogInDialogClose}
                />
              }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(Main);
