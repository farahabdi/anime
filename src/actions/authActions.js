import firebase from 'firebase';
import { firebaseAuth, db } from '../utils/config';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SAVE_USER,
  START_FETCHING_CHALLENGES,
  RECEIVED_CHALLENGES
} from '../constants';

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithRedirect(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}

export const startFetchingChallenges = () => ({
  type: START_FETCHING_CHALLENGES
});

export const receivedChallenges = () => ({
  type: RECEIVED_CHALLENGES
});

export const saveUser = () => {
  return function (dispatch)  {
    const user = firebase.auth().currentUser;
    const userRef = db.collection('users').doc(`${user.uid}`)

    userRef.set({
      uid: user.uid,
      displayName: user.displayName,
      birthday: '',
      email: user.email
    })

    userRef.collection("challenges")
    .doc(`${user.uid}`)
    .set({
       challenge1: false,
       challenge2: false,
       challenge3: false,
       challenge4: false,
       challenge5: false
    })

  };
};

export const initialiseApp= () => {
  return function (dispatch)  {
    dispatch(checkUserExists());
  };
};


export const fetchChallenges = () => {
  return function (dispatch)  {

    const user = firebase.auth().currentUser;

    db.collection("users")
      .doc(`${user.uid}`)
      .collection("challenges")
      .doc(`${user.uid}`)
      .onSnapshot(querySnapshot => {
              const data = querySnapshot.data()
              let challenges = []
              debugger

              querySnapshot.forEach(function(doc) {
                let x = 2
                
            });
              debugger
            })
  };
};


export const checkUserExists = () => ({
  type: 'CHECK_USER_EXISTS'
});


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
  authenticate(new firebase.auth.FacebookAuthProvider)
)





export const signOut = () => {
  return function (dispatch)  {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export const signOutSuccess = () => {
    type: SIGN_OUT_SUCCESS
}