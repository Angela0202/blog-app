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
    const { comments } = this.props;

    return (
      <Grid container spacing={16}>
        {
          comments.map((comment, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Typography variant="title">{comment.title}</Typography>
              <div>
                <List>
                  <ListItem>
                    <ListItemText primary={comment.commentBody} />
                  </ListItem>
                </List>
              </div>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(CommentList);
