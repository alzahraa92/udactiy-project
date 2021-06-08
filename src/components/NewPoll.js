import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import UserCard from './UserCard'

class NewPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    noLogger: false,
  }

  handleChange = function(event, optionNum) {
    const text = event.target.value;

    this.setState(function(preState) {
      return optionNum === 1
        ? { ...preState, 'optionOne': text }
        : { ...preState, 'optionTwo': text };
    });
  }

  handleSubmit = function(event) {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(function(preState) {
      return {
        ...preState,
        noLogger: true,
      };
    })
  }

  render() {
    const { optionOne, optionTwo, noLogger } = this.state;
    const { authedUser} = this.props;
    if (noLogger === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="newQu">
        <UserCard id={authedUser}/>
        <div>
          <label>
            <h4>Would You Rather? </h4>
          </label>
          <form
            onSubmit={(event) => this.handleSubmit(event)}
          >
            <div className="option">
              <textarea
                value={optionOne}
                onChange={(event) => this.handleChange(event, 1)}
              />
              <em > Option One </em>
            </div>
            <br />
            <div className="option st-option">
              <textarea
                value={optionTwo}
                onChange={(event) => this.handleChange(event, 2)}
              />
              <em> Option Two </em>
            </div>
            <hr />
            <button
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}
            >
              Submit
            </button>
          </form>
        </div>
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

export default connect(mapStateToProps)(NewPoll)
