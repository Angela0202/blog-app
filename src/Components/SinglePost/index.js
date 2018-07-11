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

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: 0
    };
  }

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
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePost);
