import {connect} from "react-redux";
import React, { Component } from "react";
import {   NavbarToggler } from "reactstrap";
import { withRouter,  NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
class Nav extends Component {
  state = {
    isOpen: false
  };

  toggle = () =>  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div clasName='home'>
          {authedUser &&
          <div>
            <NavbarToggler onClick={this.toggle}/>
            <div isOpen={this.state.isOpen} navbar>
              <form className="navbar" navbar>
               <li>
                  <NavLink  to="/home"> Home</NavLink>
                </li>
                <li>
                  <NavLink exact to="/add">New Poll</NavLink>
                </li>
                <li>
                  <NavLink exact to="/leaderboard">LeaderBoard</NavLink>
                </li>
                <div className='navbarRight'>
                <li>
                  <UserCard id={authedUser}/>
                </li>
                <li>
                  <NavLink exact to='/'>Logout</NavLink>
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
