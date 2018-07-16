import React, { Component, Fragment } from 'react';

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
        <Grid item xs={12} md={12} lg={12}>
          <h3>Comments</h3>
          <List className={classes.grid}>
            {comments.map(
              (comment, index) =>
                comment.postID === postID ? (
                  <div className={classes.list} key={index}>
                    <ListItem className={classes.listItem}>
                      <Typography variant="title">
                        {comment.commentTitle}
                      </Typography>
                      <ListItemText
                        className={classes.listItemText}
                        primary={comment.commentBody}
                      />
                    </ListItem>
                    <span style={{ fontSize: '16px' }}>
                      <em>
                        -{comment.commenter
                          ? comment.commenter
                          : 'unknown user'}
                      </em>
                    </span>
                  </div>
                ) : (
                  ''
                )
            )}
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CommentList);
