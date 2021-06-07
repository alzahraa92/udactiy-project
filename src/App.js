import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from './actions/shared'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import AboutQu from './components/AboutQu'
import LeaderBoard from './components/LeaderBoard'
import NewPoll from './components/NewPoll'

class App extends Component {

	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
  render() {
    return (
      <Router>
        <Fragment>
          {
            !this.props.nologin &&
            <Nav />
          }
          <LoadingBar/>
          <div >
            <div>
              <Route path='/login' exact component={Login} />
              <Route path='/' exact component={Home} />
              <Route path='/questions/:id' component={AboutQu} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
              <Route path='/add' exact component={NewPoll} />
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    nologin: authedUser === null
  }
}


export default connect(mapStateToProps)(App)