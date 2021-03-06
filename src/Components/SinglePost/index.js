import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  CardActions,
  TextField
} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentList from '../CommentList';
import CreateComment from '../CreateComment';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

class SinglePost extends Component {
  constructor(props) {
    super(props);

    const posts = this.props.posts;
    this.post = SinglePost.findPostById(posts);

    this.state = {
      clicked: this.post.likes,
      isEditing: false,
      value: this.post.body
    }
  }

  static findPostById = (posts) => posts.filter(post => post.postID === +SinglePost.getSinglePostID())[0];

  CommentCreate = comment => {
    const { onCommentCreate } = this.props;

    onCommentCreate(comment);
  };

  static getSinglePostID() {
    const path = window.location.pathname,
      splittedPath = path.split('/');

    return splittedPath[splittedPath.length - 1].slice(-1);
  }

  onClick = () => {
    const { onPostLike } = this.props;

    this.setState(prevState => ({
      clicked: prevState.clicked + 1
    }), () => onPostLike(this.post, this.state.clicked));
  };

  onEditButtonClick = () => {
    this.setState({
      isEditing: true
    })
  };

  onSaveButtonClick = () => {
    const { onPostEdit } = this.props;

    this.setState({
      isEditing: false,
      value: this.state.value
    });
    onPostEdit(this.post, this.state.value);
  };


  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { classes, isAuthenticated, currentUser, comments } = this.props;
    const { isEditing, value } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={this.post.title}
            subheader={`created by ${this.post.authorName} on ${
              this.post.date
            }`}
          />
          <CardMedia className={classes.media} image={this.post.image} />
          <CardContent>
            {!isEditing ? (
              <Typography component="p">{value}</Typography>
            ) : (
              <TextField
                id="multiline-static"
                label="Multiline"
                multiline
                rows="4"
                value={value}
                className={classes.textField}
                margin="normal"
                fullWidth
                onChange={this.onChange}
              />
            )}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button aria-label="Add to favorites" onClick={this.onClick}>
              <FavoriteIcon />
              <span>{this.post.like}</span>
            </Button>
            {!((currentUser.userID === this.post.authorID) && isAuthenticated) ?
              ('') : (
                <Button
                  variant="fab"
                  color="secondary"
                  className={classes.button}
                  onClick={!isEditing ? this.onEditButtonClick : this.onSaveButtonClick}
                >
                  {!isEditing ? (<EditIcon />) : (<SaveIcon />)}
                </Button>
              )}

          </CardActions>
          <CommentList
            comments={comments}
            postID={this.post.postID}
          />
          <CreateComment
            onCommentCreate={this.CommentCreate}
            currentUser={currentUser}
            post={this.post}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePost);
