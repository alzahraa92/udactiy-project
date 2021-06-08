import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutQu from './AboutQu';

class Home extends Component {
  state = {
    answerVeiw: false,
  }

  handleQuestionList = function(answered) {
    this.setState(function() {
      return {
        answerVeiw: answered
      };
    });
  }

  render() {
    const { authedUser, questions } = this.props;
    const { answerVeiw } = this.state;
   
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(
      function(question) {
      const contains = ( question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1  );
      return answerVeiw ? contains : !contains;
    });
    const sorted = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

      return (
        <div className='leaderBoard' >
          <div>
            <button
              className={!answerVeiw ? 'unanswer active' : 'unanswer'}
              onClick={(event) => this.handleQuestionList(false)}
            >
              Unanswer
            </button>
            <button
              className={answerVeiw ? 'answer active' : 'answer'}
              onClick={(event) => this.handleQuestionList(true)}
            >
              Answer
            </button>
          </div>
          <ul>
            {sorted.map((question) => (
              <li key={question.id}>
                <AboutQu question={question} />
              </li>
            ))}
          </ul>
        </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Home)
