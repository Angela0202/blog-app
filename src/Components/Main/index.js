import React, { Component } from 'react';

import Navigation from '../Navigation';
import Authentication from '../Authentication';
import CreateNewPost from '../CreateNewPost';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../utils/privateRoute';
import AllPosts from '../AllPosts';
import SinglePost from '../SinglePost';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      open: false,
      users: [],
      currentUser: ''
    };
  }

  createNewUser = newUser => {
    const { users } = this.state;
    const NewUsersList = [...users, newUser];

    this.setState(
      {
        users: NewUsersList,
        currentUser: newUser
      },
      () => console.log(this.state.users)
    );
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
    this.setState({
      isAuthenticated: false,
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, open, currentUser } = this.state;

    return (
      <Router>
        <div className={classes.root}>
          <Navigation
            isAuthenticated={isAuthenticated}
            logInClickOpen={this.logInClickOpen}
            onLogOut={this.onLogOut}
          />
          <div className={classes.container}>
            <Switch>
              <Route exact path="/" render={() => <AllPosts />} />
              <PrivateRoute
                path="/create"
                component={CreateNewPost}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
              />
              <Route path="/post/:id" component={SinglePost} />
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
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(Main);
