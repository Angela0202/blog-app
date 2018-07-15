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
      clicked: 0,
      comments: [],
      isEditing: false,
      value: this.post.body
    }
  }

  static findPostById = (posts) => posts.filter(post => post.postID === +SinglePost.getSinglePostID())[0];

  onCommentCreate = comment => {
    const { comments } = this.state;

    this.setState({
      comments: [{ ...comment }, ...comments]
    });

    this.post.comments = this.post.comments.concat([
      comment,
      ...comments
    ]);

    localStorage.setItem(
      this.post.postID,
      JSON.stringify({ ...this.post })
    );
  };

  static getSinglePostID() {
    const path = window.location.pathname,
      splittedPath = path.split('/');

    return splittedPath[splittedPath.length - 1].slice(-1);
  }

  onClick = () => {
    this.setState(prevState => ({
      clicked: prevState.clicked + 1
    }));
  };

  onEditOrSaveButtonClick = (e) => {
    console.log(e.target);
    const { isEditing } = this.state;
    !isEditing ?
      this.setState({
        isEditing: true
      })
      :
      this.setState({
        isEditing: false,
        value: this.state.value
      }, () => {
        this.post.body = this.state.value;

        localStorage.setItem(
          this.post.postID,
          JSON.stringify({ ...this.post })
        );
      });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { classes, isAuthenticated, currentUser } = this.props;
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
              <span>{this.state.clicked}</span>
            </Button>
            {!((currentUser.userID === this.post.authorID) && isAuthenticated) ?
              ('') : (
                <Button
                  variant="fab"
                  color="secondary"
                  className={classes.button}
                  onClick={this.onEditOrSaveButtonClick}
                >
                  {!isEditing ? (<EditIcon />) : (<SaveIcon />)}
                </Button>
              )}

          </CardActions>
          <CommentList comments={this.post.comments} />
          <CreateComment onCommentCreate={this.onCommentCreate} />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePost);
