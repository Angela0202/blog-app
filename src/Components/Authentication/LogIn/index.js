import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField } from '@material-ui/core/';

class LogIn extends Component {
  constructor(props) {
    super(props);
  }

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
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onLogInDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onLogInDialogClose} color="primary">
              Log In
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(LogIn);
