import React from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  loadQuestionDetails(e, questionId) {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    const {question, auther} = this.props;
    return (
      <div onClick={(e) => this.loadQuestionDetails(e, question.id)}>
        <form >
          <label>Would You Rather</label>
          <ul>
            <li className={question.optionOne.votes.includes(auther) ? "optionSelected" : ""}>{question.optionOne.text}</li>
            <li className={question.optionTwo.votes.includes(auther) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
          </ul>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps (state, { id }) {
  return {
    question : state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
