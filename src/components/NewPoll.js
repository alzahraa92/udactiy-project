import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {  addQuestionUser} from '../actions/users'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        redirect: false
    };

    handleOptionOneChange = (event) => {
        event.preventDefault();
        this.setState({
          optionOne : event.target.value
        })
      };

      handleOptionTwoChange = (event) => {
        event.preventDefault();
        this.setState({
          optionTwo : event.target.value
        })
      };

    handleLogin = (event) => {
        event.preventDefault();
        const { optionOne, optionTwo } = this.state;
        this.props.addQuestion(optionOne, optionTwo);
        this.setState({ redirect: true })
    };

    render() {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
        const { optionOne, optionTwo } = this.state;
        return (
            <div className="newQu">
              <Fragment>
              <form>
                    <h3>Would You Rather</h3>
                    <ul onSubmit={this.handleLogin}>
                      <li>
                        <label for="optionOne">Option One</label>
                        <input type="text"
                          name="optionOne"
                          value={optionOne}
                          onChange={this.handleOptionOneChange}
                          placeholder="Option One" />
                      </li>
                      <li>
                        <label for="optionTwo">Option Two</label>
                        <input type="text"
                          name="optionTwo"
                          value={optionTwo}
                          onChange={this.handleOptionTwoChange}
                          placeholder="Option Two" />
                      </li>
                      <button disabled={optionOne === '' || optionTwo === ''}>Add</button>
                    </ul>
              </form>
              </Fragment>
            </div>
          );
    }
}

NewPoll.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
      addQuestion: (optionOne, optionTwo) => {
        dispatch( addQuestionUser(optionOne, optionTwo))
      }
    }
  }


export default connect(null, mapDispatchToProps)(NewPoll)
