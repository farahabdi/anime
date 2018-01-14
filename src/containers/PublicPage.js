import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authActions } from '../actions';

class PublicPage extends Component {
  componentWillMount() { }
  render() {
    const { signInWithFacebook } = this.props;
    return (
      <div>
        <h1>Landing Page</h1>
        <h2>Sign in</h2>
        <button onClick={signInWithFacebook}>Facebook</button>
      </div>
    );
  }
}

PublicPage.propTypes = {
  signInWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInWithFacebook: authActions.signInWithFacebook,
};

export default connect(null, mapDispatchToProps)(PublicPage);
