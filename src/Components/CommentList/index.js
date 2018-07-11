import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';

class CommentList extends Component {
  render() {
    const { comments } = this.props;

    return(
      <ul>
        {
          comments.map((comment, index) => (
            <li key={index}>{comment.body}</li>
          ))
        }
      </ul>
    );
  }
}

export default withStyles(styles)(CommentList);