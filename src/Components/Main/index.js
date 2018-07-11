import React, { Component } from 'react';

import Navigation from '../Navigation';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    }
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div>
          <Navigation isAuthenticated={isAuthenticated}/>
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(Main);
