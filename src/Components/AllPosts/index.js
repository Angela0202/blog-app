import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button
} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

class AllPosts extends Component {
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

  render() {
    const { classes } = this.props;
    const posts = AllPosts.readFromLocalStorage();

    return (
      <div>
        <div className={classes.container}>
          {posts.map(post => (
            <div key={post.postID}>
              <Card className={classes.card}>
                <CardHeader
                  title={post.title}
                  subheader={`created on ${post.date}`}
                />
                <CardMedia className={classes.media} image={post.image} />
                <CardContent>
                  <Typography component="p">{post.body}</Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <div>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/post/:${post.postID}`}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(AllPosts);
