import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../reducers/selectors'
import AuthenticatedPage from './AuthenticatedPage';
import PublicPage from './PublicPage';

class App extends Component {

    render() {
      let { authenticated } = this.props

      return (
        <main>
          {authenticated ? (
            <AuthenticatedPage />
          ) : (
            <PublicPage />
          )}
        </main>
      )
    }
}

const mapStateToProps = getAuth;

export default connect( mapStateToProps, null )(App)


