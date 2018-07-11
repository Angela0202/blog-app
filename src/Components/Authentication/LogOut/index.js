import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core/';

class LogOut extends React.Component {
  logOut = () => {
    const { onLogOut, onRedirect } = this.props;

    onLogOut();
    onRedirect();
  };

  render() {
    const { isOpen, LogInDialogClose } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={LogInDialogClose}
      >
        <DialogTitle id="form-dialog-title">Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={LogInDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.logOut} color="primary">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LogOut;
