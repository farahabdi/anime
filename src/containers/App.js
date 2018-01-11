import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { authActions } from '../actions';
import { getAuth } from '../reducers/selectors'
import { db } from '../utils/config'
import Header from '../components/Header';
import SignInPage from '../pages/signIn';
import LandingPage from '../pages/landing';
import { userExists } from '../utils/auth'

class App extends Component {
  state = {
    challenges: []
  }

  componentWillMount() {
  
    const { authActions } = this.props

    authActions.initialiseApp()

   /*
    let userExist = userExists() //Look up database if user exists
debugger
    if (userExist) {
      saveUser()
    } else {
      let ch = fetchChallenges()
    }
    */
  }


    render() {
      let { authenticated, authActions} = this.props

      return (
        <div>
        <Header
          authenticated={authenticated}
          signOut={authActions.signOut}
        />

        <button > fetch challenges</button>
        <main>
          {authenticated ? (
            <LandingPage />
          ) : (
            <SignInPage  />
          )}
        </main>
      </div>
      )
    }
}

const mapStateToProps = getAuth;

/*

function mapDispatchToProps (dispatch, ownProps) {
  return {
    signOut: authActions.signOut,
    saveUser: dispatch(authActions.saveUser),
    fetchChallenges: dispatch(authActions.fetchChallenges),
    initialiseApp: authActions.initialiseApp
  }
}

*/
function mapDispatchToProps (dispatch, ownProps) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)


