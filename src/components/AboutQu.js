import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';
import { handleAddAnswer } from '../actions/users';
import PropTypes from 'prop-types';
class AboutQu extends Component {
  state = {
    selectedOption: ''
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, questionAuthor, answer, total, percOne, percTwo} = this.props;
    const { selectedOption } = this.state;

    return (
      <div>
          <form className='newQu'>
            <header>
              <UserCard id={questionAuthor.id}/>
            </header>
            <div>
              <h2>Would You Rather</h2>
              {answer ?
                <div>
                  <div>
                    <div check disabled>
                      <label check>
                        <input type="radio" checked={answer==="optionOne"} readOnly/>{' '}
                        {question.optionOne.text}
                      </label>
                    </div>
                    <div check disabled>
                      <label check>
                        <input type="radio" checked={answer==="optionTwo"} readOnly/>{' '}
                        {question.optionTwo.text}
                      </label>
                    </div>
                  </div>
                  <div >
                    <div  style={{ width: `${percOne}%` }}>{`${percOne}%`}</div>
                    <div  style={{ width: `${percTwo}%` }}>{`${percTwo}%`}</div>
                  </div>
                  <div >
                     Votes Num: {total}
                  </div>
                </div>:
                <form onSubmit={this.handleLogin}>
                  <div tag="fieldset">
                    <div >
                      <label >
                        <input type="radio" name="radio1" value="optionOne" onChange={this.radioSelected} />{' '}
                        {question.optionOne.text}
                      </label>
                    </div>
                    <div >
                      <label >
                        <input type="radio" name="radio1" value="optionTwo" onChange={this.radioSelected} />{' '}
                        {question.optionTwo.text}
                      </label>
                    </div>
                  </div>
                  <button disabled={selectedOption === ''}>Choose</button>
                </form>
              }
            </div>
          </form>
      </div>
    );
  }
}

AboutQu.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  answer: PropTypes.string,
  percOne: PropTypes.string.isRequired,
  percTwo: PropTypes.string.isRequired
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percOne, percTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id]
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percOne = financial((question.optionOne.votes.length / total) * 100);
  percTwo = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAddAnswer(id, answer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutQu)
