import {
    RECEIVE_QUESTIONS,
    ADD_ANSWER_QUESTION,
    ADD_QUESTION
  } from '../actions/questions';
  
  export default function questions(state = {}, action) {
    switch (action.type) {
      case RECEIVE_QUESTIONS:
        return {
          ...state,
          ...action.questions
        };
        case ADD_QUESTION:
          return {
            ...state,
            [action.question.id]: action.question
          };
    
        case ADD_ANSWER_QUESTION:
          const { qid, answer, authedUser } = action.answerInfo;
    
          return {
            ...state,
            [qid]: {
              ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([authedUser])
              }
            }
          };
    
        default:
          return state;
      }
    }