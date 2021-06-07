import { saveQuestionAnswer } from '../utils/api';
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_USER = 'ADD_ANSWER_USER';
export const  ADD_USER_QUESTION = ' ADD_USER_QUESTION';
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
export function addUserQuestion (authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid
  }
}
function addAnswerUser(authedUser, qid, option) {
    return {
      type: ADD_ANSWER_USER,
      authedUser,
      qid,
      option
    };
  } 
export function handleAddAnswer( qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      authedUser: authedUser,
      qid,
      answer: option
    };
    saveQuestionAnswer(info)
        .then(() => {
            dispatch(saveQuestionAnswer(authedUser, qid, option));
            dispatch(addAnswerUser(authedUser, qid, option))
        })
  }
}
