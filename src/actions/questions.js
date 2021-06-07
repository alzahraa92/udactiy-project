import { saveQuestion } from '../utils/api';
import {addUserQuestion} from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';
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
export function handleAddQuestion(optionOneText, optionTwoText){
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
    })
    .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(authedUser, question.id))
    })

}
}
