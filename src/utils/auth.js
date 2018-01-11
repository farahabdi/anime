import { firebaseAuth } from './config';
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
