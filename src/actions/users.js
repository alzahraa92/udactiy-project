import { saveQuestionAnswer } from '../utils/api';
import { addAnswerQuestion } from './questions';
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_USER = 'ADD_ANSWER_USER';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
function addAnswerUser(authedUser, qid, answer) {
    return {
      type: ADD_ANSWER_USER,
      authedUser,
      qid,
      answer
    };
  } 
export function handleAddAnswer(authedUser, qid, answer) {
    return dispatch => {
      dispatch(addAnswerUser(authedUser, qid, answer));
      dispatch(addAnswerQuestion(authedUser, qid, answer));
  
      return saveQuestionAnswer(authedUser, qid, answer).catch(e => {
        console.warn('Error in handleSaveQuestionAnswer:', e);
      });
    };
}
export function addQuestionUser({ id, author }) {
    return {
      type: ADD_QUESTION_USER,
      id,
      author
    };
}