import { connect } from "react-redux"
import React from "react"
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

function LeaderBoard(props) {
  const { users } = props;
  return (
    <div className='leaderBoard'>
      <div >
              <NavLink  to="/" className="close">back</NavLink>
      </div>
      <table >
        <thead>
          <tr>
            <th>Num</th>
            <th>Profile</th>
            <th>User</th>
            <th>Questions Ask</th>
            <th>Questions Answer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td><img src={user.avatarURL} className='image' alt={`Avatar of ${user.name}`}/></td>
              <td>{user.name}</td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  }
};

export default connect(mapStateToProps)(Leaderboard)
