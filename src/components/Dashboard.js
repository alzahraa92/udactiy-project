import React, { Component ,Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  NavLink,  Col } from 'reactstrap';
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
    const { unansweredQuestions, answeredQuestions } = this.props;
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
             <h3> Unanswered </h3>
            </NavLink>
          </th>
          <th>
            <NavLink
              className={classnames({ active: this.state.activation === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h3>Answered </h3>
            </NavLink>
          </th>
          </tr>
          <tr activation={this.state.activation}>
          <th numId="1">
              {unansweredQuestions.map(qid =>
                <Col key={qid} >
                  <Question id={qid}/>
                  <br/>
                </Col>
              )}
          </th>
          <th numId="2">
              {answeredQuestions.map(qid =>
                <Col key={qid} >
                  <Question id={qid}/>
                  <br/>
                </Col>
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
  answeredPolls : PropTypes.array,
  unansweredPolls : PropTypes.array
};

function mapStateToProps ({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  }
}

export default connect(mapStateToProps)(DashBoard)
