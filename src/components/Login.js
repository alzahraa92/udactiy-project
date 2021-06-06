import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAuthedUser } from '../actions/authedUser'

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {userId : ''};
    this.handleInputUser = this.handleInputUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputUser(event) {
    this.setState({userId: event.target.value});
  }

  handleLogin(event) {
    const { userId } = this.state;
    const { userName } = this.props;
    if (userId) {
      userName(userId);
    } 
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;
    return (
        <div className='login'>
          <h1 className='header'>Would You Reather</h1>
          <form onSubmit={this.handleLogin} className='loginForm'>
              <label for="userSelect"><h3>Select User</h3></label>
              <select
                  id="userSelect"
                  type="select"
                  name="select"
                  value={userId}
                  onChange={this.handleInputUser}
                  className='tableSelec'
              >
                <option value="" disabled>Please select</option>
                {
                  Object.keys(users).map(user =>
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>)
                }
              </select>
            <button disabled={userId === ''} type="submit" value="Submit" calssName="submit">login</button>
          </form>
      </div>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  userName: PropTypes.func.isRequired
};

function mapStateToProps ({ users }) {
  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userName: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
