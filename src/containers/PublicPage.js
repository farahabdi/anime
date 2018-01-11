import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authActions } from '../actions';

export class PublicPage extends Component {

   componentWillMount() {

   }

  render() {
    const { signInWithFacebook } = this.props
    return (
        <div>
          <h1>Landing Page</h1>
          <h2>Sign in</h2>
          <button onClick={signInWithFacebook}>Facebook</button>
        </div>
    )
  }
}

const mapDispatchToProps = {
    signInWithFacebook: authActions.signInWithFacebook
};

  
export default connect( null, mapDispatchToProps)(PublicPage)
