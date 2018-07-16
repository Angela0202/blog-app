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
    const users = JSON.parse(localStorage.getItem('users'));
    const comments = JSON.parse(localStorage.getItem('comments'));

    this.state = {
      isAuthenticated: false,
      open: false,
      users: users || [],
      currentUser: '',
      posts: posts || [],
      comments: comments || []
    };
  }

  onPostCreate = post => {
    const { posts } = this.state;
    const newPost = [...posts, post];

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

    localStorage.setItem('users', JSON.stringify(NewUsersList));
  };

  onCommentCreate = comment => {
    console.log(comment);
    const { comments } = this.state;
    const newComments = [...comments, comment];

    this.setState({
      comments: newComments
    });

    localStorage.setItem('comments', JSON.stringify(newComments));
  };

  onPostEdit = (post, body) => {
    const { posts } = this.state;

    const editedPosts = posts.filter(currentElement => {
      if (currentElement.postID === post.postID) {
        //Todo change mutability to immutability
        currentElement.body = body;
        return [...posts, { ...currentElement }];
      }
      return posts;
    });

    this.setState({
      posts: editedPosts
    });

    localStorage.setItem('post', JSON.stringify(editedPosts));
  };

  onPostLike = (post, like) => {
    const { posts } = this.state;

    const likedPosts = posts.filter(currentElement => {
      if (currentElement.postID === post.postID) {
        //Todo change mutability to immutability
        currentElement.like = like;
        return [...posts, { ...currentElement }];
      }
      return posts;
    });

    this.setState({
      posts: likedPosts
    });

    localStorage.setItem('post', JSON.stringify(likedPosts));
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
    const { isAuthenticated, open, currentUser, posts, comments } = this.state;

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
                    onCommentCreate={this.onCommentCreate}
                    comments={comments}
                    onPostEdit={this.onPostEdit}
                    onPostLike={this.onPostLike}
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
