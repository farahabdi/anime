import firebase from 'firebase'
import { firebaseAuth, db } from './config';
import { initialiseAuth} from '../actions/authActions';


export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(initialiseAuth(authUser));
        unsubscribe();
        resolve();
      },
      error => reject(error)
    );
  });
}



export async function userExists() {
  const user = firebase.auth().currentUser;
  let userExists = false
  let users = await db.collection('users')
                      .doc("s8X32z5vFXOR35l6E0ibdb4Gkc72")
                      .get()
                      .then((doc) => userExists = doc.exists == true )
  return userExists
}



/* export const userExists = () => {
  const user = firebase.auth().currentUser;
  let userExists = false

  const userRef = db.collection('users')
                    .doc("s8X32z5vFXOR35l6E0ibdb4Gkc72")
                    .get()
                    .then((doc) => { 
                      userExists = doc.exists == true 
                      debugger
                    })

  return userExists
}
*/