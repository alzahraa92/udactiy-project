import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserCard from './UserCard';

function Nav(props) {
  const { authedUser } = props
  const loggedIn = authedUser !== null

  return (
    <nav className='home'>
      <div className="navbar"  >
        <li>
          <NavLink to='/' exact >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add'  >
            NewPoll
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' >
            LeaderBoard
          </NavLink>
        </li>
        {
          loggedIn
          ? 
          <div className='navbarRight'>
            <li >
              <UserCard id={authedUser}/>
            </li>
            <li >
              <NavLink to='/login' exact >
              <div >
                Logout
              </div>
              </NavLink>
            </li>
          </div>
          : <li></li>
        }
        </div>
    </nav>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav)
