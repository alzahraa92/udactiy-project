import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

class Error extends Component {
  render() {
    return (
      <div className="newQu">
      <h2>error 404...</h2>
      <h3>back to login</h3>
           <div >
                <NavLink  to="/login" className="close">back</NavLink>
           </div>
    </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(Error)
