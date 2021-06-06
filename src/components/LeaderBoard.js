import { connect } from "react-redux"
import React, {Fragment} from "react"
import PropTypes from 'prop-types';

function Leaderboard(props) {
  const { users } = props;
  return (
    <div>
      <Fragment>
      <table className='leaderBoard'>
        <thead>
          <tr>
            <th>Num</th>
            <th>Profile</th>
            <th>User</th>
            <th>Questions Asked</th>
            <th>Questions Answered</th>
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
      </Fragment>
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
