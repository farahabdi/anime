import firebase from 'firebase';
import { firebaseAuth } from '../utils/config';

import {
  fetchUserExists,
  createUser,
  fetchChallenges
} from '../api';

import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  RECEIVED_CHALLENGES,
  NEW_USER_CREATED
} from '../constants';


export const initialiseApp= () => {
  return function (dispatch)  {
    dispatch(fetchUsers());
  };
};

export const fetchUsers = () => {
  return dispatch => {
    fetchUserExists().then(userExists => { 
      dispatch(receiveUserExists(userExists))
    })
 }
}

const receiveUserExists = (userExists) => {
  return dispatch => {
    if (userExists) {
      dispatch(fetchUserChallenges())
    } else {
      dispatch(createNewUser())
    }
  };
}

export const createNewUser = () => {
  return function (dispatch)  {
    createUser().then(() => { 
      dispatch(userCreated())
    })
  };
};

export const fetchUserChallenges = () => {
  return function (dispatch)  {
    fetchChallenges().then(challenges => { 
      dispatch(receivedChallenges(challenges))
    })
  };
};

export const receivedChallenges = (challenges) => ({
  type: RECEIVED_CHALLENGES,
  payload: challenges
})

export const userCreated = () => ({
  type: NEW_USER_CREATED
})

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithRedirect(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}

export const initialiseAuth = (user) => ({
  type: INIT_AUTH,
  payload: user
})

export const signInSuccess = (result) => ({
  type: SIGN_IN_SUCCESS,
  payload: result.user
})

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  payload: error
})


export const signInWithFacebook = () => (
  authenticate(new firebase.auth.FacebookAuthProvider())
)

export const signOut = () => {
  return function (dispatch)  {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
})
