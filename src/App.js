import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom';

import { handleInitialData }  from './actions/shared'
import Routes from './components/Routes'
import Nav from './components/Nav';

class App extends Component {
  componentDidMount(){
    this.props.handleInitialData()
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className='App'>
            <Nav/>
            <Routes notLoggedIn={notLoggedIn}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData : PropTypes.func.isRequired,
  notLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps ({ authedUser }) {
  return {
    notLoggedIn: authedUser === null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)