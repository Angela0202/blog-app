import React, { Component } from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import LogIn from './LogIn';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }

  render() {
    const { isOpen, onLogInDialogClose } = this.props;

    return <LogIn isOpen={isOpen} onLogInDialogClose={onLogInDialogClose} />;
  }
}

export default withStyles(styles)(Authentication);
