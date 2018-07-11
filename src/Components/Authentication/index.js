import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import LogIn from './LogIn';
import LogOut from './LogOut';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }

  onRedirect = () => {
    this.setState({
      redirectToReferrer: true
    });
  };

  render() {
    const { isOpen, onLogInDialogClose, onLogIn, onLogOut, isAuthenticated } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return !isAuthenticated ? (
      <LogIn
        isOpen={isOpen}
        onLogInDialogClose={onLogInDialogClose}
        onLogIn={onLogIn}
        onRedirect={this.onRedirect}
      />
    ) : (
      <LogOut
        isOpen={isOpen}
        onLogInDialogClose={onLogInDialogClose}
        onLogOut={onLogOut}
        onRedirect={this.onRedirect}
      />
    )

  }
}

export default withStyles(styles)(Authentication);
