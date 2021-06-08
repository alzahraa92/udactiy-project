import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard'
import * as actions from '../actions/questions';

class AboutQu extends Component {
  handleOpion = function(option) {
    console.log(this.props)
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? 'optionOne' : 'optionTwo';
    answerQuestion(authedUser, question.id, answer);
  }

  render() {
    const { authedUser, question, users } = this.props;
    const questionAuthor = users[question.author];
    const answers = Object.keys(users[authedUser].answers);
    const answer = answers.indexOf(question.id) > -1 ? true : false;
    const voteOne = question.optionOne.votes.length;
    const voteTwo = question.optionTwo.votes.length;
    const total = voteOne + voteTwo;
    const percVoteone = (voteOne / total).toFixed(2) * 100;
    const percVotetwo = (voteTwo / total).toFixed(2) * 100;

    return (
      <div >
      <link to={`/questions/${question.id}`} style={{ textDecoration: 'none' }} >
        <form >
       <div><UserCard  id={questionAuthor.id}/> </div>
        <label>Would You Rather?</label>
        <ul>
          <li>
          <option
            className={
              question.optionOne.votes.indexOf(authedUser) > -1
              ? 'about-answer'
              : answer
                ? 'answer'
                : ''
            }
            onClick={(event) => this.handleOpion(1)}
          >
            {question.optionOne.text}
          </option>
          {answer && <span>
            Votes: {question.optionOne.votes.length} ({percVoteone}%)
          </span>}
          </li>
          <li>
          <option
            className={
              question.optionTwo.votes.indexOf(authedUser) > -1
              ? 'option-two about-answer'
              : answer
                ? 'option-two answer'
                : 'option-two'
            }
            onClick={(event) => this.handleOpion(2)}
          >
            {question.optionTwo.text}
          </option>
          {answer && <span>
            Votes: {question.optionTwo.votes.length} ({percVotetwo}%)
          </span>}
          </li>
        </ul>
        </form>
      </link>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(AboutQu);
