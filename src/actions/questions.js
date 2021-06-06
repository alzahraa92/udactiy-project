import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import {addQuestionUser} from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions
    };
}
export function addAnswerQuestion(authedUser, qid, answer) {
    return {
      type: ADD_ANSWER_QUESTION,
      authedUser,
      qid,
      answer
    };
}
function addQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    };
}
export function handleAddQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
      return saveQuestion({ optionOneText, optionTwoText, author }).then(
        question => {
          dispatch(addQuestion(question));
          dispatch(addQuestionUser(question));
        }
      );
    };
}
export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(addAnswerQuestion(authedUser, qid, answer));
      return saveQuestionAnswer({
        authedUser,
        qid,
        answer
      });
    };
};