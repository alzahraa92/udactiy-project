import React, { Component ,Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  NavLink  } from 'reactstrap';
import classnames from 'classnames';
import Question from './Question';

class DashBoard extends Component {
  state = {
    activation: '1'
  };

  toggle(num) {
    if (this.state.activation !== num) {
      this.setState({
        activation: num
      });
    }
  }

  render() {
    const { unanswerQuestions, answerQuestions } = this.props;
    return (
      <div className='leaderBoard'>
        <Fragment>
        <table>
          <tr nums>
          <th>
            <NavLink
              className={classnames({ active: this.state.activation === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
             <h2> Unanswer </h2>
            </NavLink>
          </th>
          <th>
            <NavLink
              className={classnames({ active: this.state.activation === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h2>Answer </h2>
            </NavLink>
          </th>
          </tr>
          <tr activation={this.state.activation}>
          <th numId="1">
              {unanswerQuestions.map(qid =>
                <div key={qid} >
                  <Question id={qid}/>
                  <br/>
                </div>
              )}
          </th>
          <th numId="2">
              {answerQuestions.map(qid =>
                <div key={qid} >
                  <Question id={qid}/>
                  <br/>
                </div>
              )}
          </th>
          </tr>
        </table>
        </Fragment>
      </div>
    );
  }
}

DashBoard.propTypes = {
  answerPolls : PropTypes.array,
  unanswerPolls : PropTypes.array
};

function mapStateToProps ({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answerQuestions = Object.keys(user.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unanswerQuestions : Object.keys(questions).filter(qid => !answerQuestions.includes(qid))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answerQuestions
  }
}

export default connect(mapStateToProps)(DashBoard)
