import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from '../constants';
import { Record } from 'immutable';

export const AuthState = new Record({
  authenticated: false,
  id: null
});



export default function authReducer(state = new AuthState(), {payload, type}) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return state.merge({
        authenticated: !!payload,
        id: payload ? payload.uid : null
      });

    case SIGN_OUT_SUCCESS:
      return new AuthState();
      

    default:
      return state;
  }
}
