import React, { Component } from 'react';

import Navigation from '../Navigation';
import Authentication from '../Authentication';
import CreateNewPost from '../CreateNewPost';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from '../../utils/privateRoute';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      open: false,
      users: []
    };
  }

  createNewUser = (newUser) => {
    const { users } = this.state;
    const NewUsersList = [...users, newUser];

    this.setState({
      users: NewUsersList
    }, ()=> console.log(this.state.users));
  };

  logInClickOpen = () => {
    this.setState({ open: true });
  };

  LogInDialogClose = () => {
    this.setState({ open: false });
  };

  onLogIn = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  onLogOut = () => {
    this.setState(
      {
        isAuthenticated: false,
        open: false
      },
      () => console.log(this.state.isAuthenticated)
    );
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
            onLogOut={this.onLogOut}
          />
          <Switch>
            <Route exact path="/" render={() => <h1>Posts</h1>} />
            <PrivateRoute
              path="/create"
              component={CreateNewPost}
              isAuthenticated={isAuthenticated}
            />
            <Route
              to="/login"
              render={props => (
                <Authentication
                  {...props}
                  isOpen={open}
                  isAuthenticated={isAuthenticated}
                  onLogInDialogClose={this.LogInDialogClose}
                  onLogIn={this.onLogIn}
                  onLogOut={this.onLogOut}
                  createNewUser={this.createNewUser}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(Main);
