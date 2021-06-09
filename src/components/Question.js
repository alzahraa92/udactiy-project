import React from 'react';
import { connect } from 'react-redux';
import AboutQu from './AboutQu';
import { NavLink } from "react-router-dom";

function Question(props) {
  const { id, questions } = props;
  const question = questions[id];
  return (
    <div className="newQu">
      <div >
              <NavLink  to="/" className="close">back</NavLink>
      </div>
      {question &&
        <AboutQu question={question} />
      }
    </div>
  );
}

function mapStateToProps({ authedUser, questions }, props) {
  const { id } = props.match.params;
  
  return {
    id,
    questions,
  };
}

export default connect(mapStateToProps)(Question);
