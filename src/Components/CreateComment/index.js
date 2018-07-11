import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      title: ''
    };
  }

  onChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClick = () => {
    const { comment, title } = this.state;
    const { onCommentCreate } = this.props;
    const trimmedValue = comment.trim();

    if (trimmedValue !== '') {
      this.setState({
        comment: '',
        title: ''
      }, () => console.log(this.state.comment));
      onCommentCreate({ body: trimmedValue, title });
    }
  };

  render() {
    const { classes } = this.props;
    const { comment, title } = this.state;

    return (
      <form className={classes.container}>
        <span>Title</span>
        <TextField
          id="title"
          name="title"
          className={classes.textField}
          value={title}
          onChange={this.onChange('title')}
          margin="normal"
          fullWidth
        />
        <span>Add Comment</span>
        <TextField
          id="multiline-static"
          multiline
          rows="10"
          className={classes.textField}
          margin="normal"
          fullWidth
          value={comment}
          name="comment"
          onChange={this.onChange('comment')}
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.button}
          onClick={this.onClick}
        >
          <AddIcon />
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateComment);
