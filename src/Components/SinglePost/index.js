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

    this.state = {
      clicked: 0,
      comments: [],
      isEditing: false,
      value: JSON.parse(SinglePost.getSingleItemFromLocalStorage(SinglePost.getSinglePostID())).body
    }
  }

  onCommentCreate = comment => {
    const { comments } = this.state;

    const postID = SinglePost.getSinglePostID(),
      post = SinglePost.getSingleItemFromLocalStorage(postID),
      postInJsonFormat = JSON.parse(post);

    this.setState({
      comments: [{ ...comment }, ...comments]
    });

    postInJsonFormat.comments = postInJsonFormat.comments.concat([
      comment,
      ...comments
    ]);

    localStorage.setItem(
      postInJsonFormat.postID,
      JSON.stringify({ ...postInJsonFormat })
    );
  };

  static getSinglePostID() {
    const path = window.location.pathname,
      splittedPath = path.split('/');

    return splittedPath[splittedPath.length - 1].slice(-1);
  }

  static getSingleItemFromLocalStorage(id) {
    return localStorage.getItem(id);
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
      });
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const postID = SinglePost.getSinglePostID(),
      post = SinglePost.getSingleItemFromLocalStorage(postID),
      postInJsonFormat = JSON.parse(post);

    const { classes, isAuthenticated } = this.props;
    const { isEditing, value } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={postInJsonFormat.title}
            subheader={`created by ${postInJsonFormat.authorName} on ${
              postInJsonFormat.date
            }`}
          />
          <CardMedia className={classes.media} image={postInJsonFormat.image} />
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
            <Button
              variant="fab"
              color="secondary"
              className={classes.button}
              onClick={this.onEditOrSaveButtonClick}
              disabled={!isAuthenticated}
            >
              {!isEditing ? (<EditIcon />) : (<SaveIcon />)}
            </Button>
          </CardActions>
          <CommentList comments={postInJsonFormat.comments} />
          <CreateComment onCommentCreate={this.onCommentCreate} />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePost);
