import {connect} from "react-redux";
import React, { Component } from "react";
import { withRouter,  NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { resetAuthedUser } from '../actions/authedUser';
class Nav extends Component {
  handleLogout =(e) => {
    const { dispatch } = this.props;
    e.preventDefault();
		dispatch(resetAuthedUser());
	};
  render() {
    const { authedUser } = this.props;
    return (
      <div clasName='Home'>
          {authedUser &&
          <div>
            <div  >
              <form className="navbar" >
               <li>
                  <NavLink  to="/home"> Home</NavLink>
                </li>
                <li>
                  <NavLink  to="/add">New Poll</NavLink>
                </li>
                <li>
                  <NavLink  to="/leaderboard">LeaderBoard</NavLink>
                </li>
                <div className='navbarRight'>
                <li>
                  <UserCard id={authedUser}/>
                </li>
                <li>
                    <button onClick={this.handleLogout} > Logout </button>
                </li>
                </div>
              </form>
            </div>
          </div>
          }
      </div>
    );
  }
}

Nav.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Nav))
