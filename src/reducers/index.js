import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import authedUser from '../reducers/authedUser';
import questions from '../reducers/questions';
import users from '../reducers/users';

export default combineReducers({
  authedUser,
  loadingBar: loadingBarReducer,
  questions,
  users
});