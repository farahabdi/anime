import firebase from 'firebase';
import { firebaseAuth } from '../utils/config';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../constants';


function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithRedirect(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}


export function initialiseAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}


export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}


export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}


export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}


export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}


export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}