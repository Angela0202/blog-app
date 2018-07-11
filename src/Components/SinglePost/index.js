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
  CardActions
} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentList from '../CommentList';
import CreateComment from '../CreateComment';

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: 0,
/*      comments: {
        userID: '',
        postID: '',
        title: '',
        body: ''
      },*/
      comments: []
    };
  }

  onCommentCreate = (comment) => {
    const { comments } = this.state;

    const postID = SinglePost.getSinglePostID(),
      post = SinglePost.getSingleItemFromLocalStorage(postID),
      postInJsonFormat = JSON.parse(post);

    this.setState({
      comments: [{postID: postID, userID: postInJsonFormat.authorID, ...comment}, ...comments]
    }, () => console.log(this.state.comments));
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

  render() {
    const postID = SinglePost.getSinglePostID(),
      post = SinglePost.getSingleItemFromLocalStorage(postID),
      postInJsonFormat = JSON.parse(post);

    const { classes } = this.props;
    const { comments } = this.state;

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
            <Typography component="p">{postInJsonFormat.body}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button aria-label="Add to favorites" onClick={this.onClick}>
              <FavoriteIcon />
              <span>{this.state.clicked}</span>
            </Button>
          </CardActions>
          <CommentList comments={comments}/>
          <CreateComment onCommentCreate={this.onCommentCreate}/>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePost);
