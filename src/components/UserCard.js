import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class UserCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Fragment>
        <img src={user.avatarURL} className='image' alt={`Avatar of ${user.name}`}/>
        <span>{user.name}</span>
        </Fragment>
      </div>  
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps ({ users }, { id }) {
  return {
    user : users[id]
  }
}


export default connect(mapStateToProps)(UserCard)
