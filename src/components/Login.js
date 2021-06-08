import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser, resetAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    userId: null,
    noLogger: false,
  }

  handleSelectChanged = function(event) {
    const userId = event.target.value;

    this.setState(function(preState) {
      return {
        ...preState,
        userId,
      };
    });
  }

  handleLogin = function(event) {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    this.setState(function(preState) {
      return {
        ...preState,
        noLogger: true,
      };
    });
  }

  componentDidMount() {
    this.props.dispatch(resetAuthedUser())
  }

  render() {
    const { userId, noLogger } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : 0;
    if(noLogger) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/' />
    }
    return (
      <div className="login">
        <h1 className='header'>Would You Reather</h1>
        <form className='loginForm'>
            <select 
            value={selected}
            onChange={(event) => this.handleSelectChanged(event)}
            className="tableSelec"
            >
              <option value={0} disabled>Select user</option>
              {Object.keys(users).map(function(key) {
                return (
                  <option value={users[key].id} key={key}>{users[key].id}</option>
                );
              })}
            </select>
          <button
            disabled={userId === null}
            onClick={(event) => this.handleLogin(event)}
            className="submit"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))


