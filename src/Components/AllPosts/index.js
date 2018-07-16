import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Button
} from '@material-ui/core/';
import { Link } from 'react-router-dom';

class AllPosts extends Component {
  render() {
    const { classes, posts } = this.props;

    return (
      <div className={classes.container}>
        {posts.map(post => (
          <Card className={classes.card} key={post.postID}>
            <CardHeader
              title={post.title}
              subheader={`created on ${post.date}`}
            />
            <CardContent>
              <Typography component="p" className={classes.postBody}>
                {post.body.substr(0, 70)}...
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Button
                size="small"
                color="primary"
                component={Link}
                to={`/post/:${post.postID}`}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}
export default withStyles(styles)(AllPosts);
