import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

class CreateNewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        body: '',
        image: '',
        authorID: this.props.currentUser.userID,
        authorName: this.props.currentUser.username,
        date: this.getDate(),
        comments: {}
      },

      redirect: false
    };
  }

  static ID = Object.keys(localStorage).length;

  getDate() {
    let currentDate = new Date(),
      day = currentDate.getDate(),
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    currentDate = month + '/' + day + '/' + year;

    return currentDate;
  }

  onChange = name => event => {
    this.setState({
      post: {
        ...this.state.post,
        [name]: event.target.value
      }
    });
  };

  onClick = () => {
    const { title, body } = this.state.post;

    if (title.trim() !== '' && body.trim() !== '') {
      const post = { ...this.state.post, postID: ++CreateNewPost.ID };
      localStorage.setItem(post.postID, JSON.stringify(post));

      this.setState(
        {
          post: {
            title: '',
            body: '',
            image: '',
            authorID: this.props.currentUser.userID,
            authorName: this.props.currentUser.username,
            date: this.getDate()
          },
          redirect: true
        }/*,
        () => {
          if (this.state.redirect) {
            window.location.href = '/';
            /!*return <Redirect to="/" />*!/
          }
        }*/
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { title, body, image } = this.state.post;
    return (
      <div className={classes.container}>
        <h1> Add New Post </h1>
        <form autoComplete="off" className={classes.formContainer}>
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={title}
            onChange={this.onChange('title')}
            margin="normal"
          />
          <TextField
            id="multiline-static"
            rows="10"
            label="Body"
            multiline
            rowsMax="10"
            value={body}
            onChange={this.onChange('body')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="name"
            label="Featured Image URL"
            className={classes.textField}
            value={image}
            onChange={this.onChange('image')}
            margin="normal"
          />
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            onClick={this.onClick}
          >
            <SaveIcon />
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateNewPost);
