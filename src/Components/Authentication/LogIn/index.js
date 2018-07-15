import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core/';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  static userID = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).length : 0;

  loginProcess = () => {
    const { username, password } = this.state;
    const { onRedirect, onLogIn, createNewUser } = this.props;

    createNewUser({userID: LogIn.userID++, username, password});
    onRedirect();
    onLogIn();
  };

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    const {isOpen, onLogInDialogClose} = this.props;

    return(
        <Dialog
          open={isOpen}
          onClose={onLogInDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              onChange={this.onUsernameChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.onPasswordChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onLogInDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.loginProcess} color="primary">
              Log In
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(LogIn);
