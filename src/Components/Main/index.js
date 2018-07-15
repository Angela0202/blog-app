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

    const posts = JSON.parse(localStorage.getItem('post'));
    console.log('ls', posts);

    this.state = {
      isAuthenticated: false,
      open: false,
      users: [],
      currentUser: '',
      posts: posts || []
    };
  }

  static readFromLocalStorage() {
    const values = [],
      keys = Object.keys(localStorage);
    let i = 0;

    while (i < keys.length) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
      i++;
    }

    return values;
  }

  onPostCreate = post => {
    const { posts } = this.state;
    const newPost = [...posts, post];
    console.log(newPost);

    this.setState({
      posts: newPost
    });

    localStorage.setItem('post', JSON.stringify(newPost));
  };

  createNewUser = newUser => {
    const { users } = this.state;
    const NewUsersList = [...users, newUser];

    this.setState({
      users: NewUsersList,
      currentUser: newUser
    });
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
    const { isAuthenticated, open, currentUser, posts } = this.state;

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
              <Route
                exact
                path="/"
                render={props => <AllPosts {...props} posts={posts} />}
              />
              <PrivateRoute
                path="/create"
                component={CreateNewPost}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                onPostCreate={this.onPostCreate}
                posts={posts}
              />
              <Route
                path="/post/:id"
                render={props => (
                  <SinglePost
                    {...props}
                    isAuthenticated={isAuthenticated}
                    posts={posts}
                    currentUser={currentUser}
                  />
                )}
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
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(Main);
