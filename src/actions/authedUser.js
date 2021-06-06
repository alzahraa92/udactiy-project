export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const RESET_AUTHED_USER = 'UNSET_AUTHED_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}
export function unsetAuthedUser () {
  return {
    type: RESET_AUTHED_USER
  }
}