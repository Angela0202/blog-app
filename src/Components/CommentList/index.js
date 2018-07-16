import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core/';

class CommentList extends Component {
  render() {
    const { comments, classes, postID } = this.props;

    return (
      <Grid container spacing={16} className={classes.container}>
        <h3>Comments</h3>
        {comments.map(
          (comment, index) =>
            comment.postID === postID ? (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                key={index}
                className={classes.grid}
              >
                <Typography variant="title">{comment.commentTitle}</Typography>
                <div>
                  <List>
                    <ListItem>
                      <ListItemText primary={comment.commentBody} />
                    </ListItem>
                  </List>
                </div>
              </Grid>
            ) : (
              ''
            )
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(CommentList);
