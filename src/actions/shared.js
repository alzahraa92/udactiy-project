import { getInitialData, saveQuestion } from '../utils/api';
import { receiveQuestions,addQuestion } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
  return function(dispatch) {
    getInitialData()
      .then(function({ users, questions }) {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      });
  }
}
export function handleAddQuestion(optionOneText, optionTwoText) {
  return function(dispatch, getState) {
    const { authedUser } = getState();

    const questionInfo = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return saveQuestion(questionInfo)
      .then(function(question) { dispatch(addQuestion(question)) });
  };
}


