import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authActions } from '../actions';

export class AuthenticatedPage extends Component {

   componentWillMount() {
    authActions.initialiseApp()
   }

  render() {
    const { signOut } = this.props
    return (
        <div>
          <h1>Sign out</h1>
          <button onClick={signOut}>Facebook</button>
        </div>
    )
  }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
};

  
export default connect( null, mapDispatchToProps)(AuthenticatedPage)
