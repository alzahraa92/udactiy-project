import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import Login from './components/Login';
import Nav from './components/Nav';
import NewPoll from './components/NewPoll';
import Error from './components/Error';
import Question from './components/Question';
import PrivateRoute from './components/PrivateRoute';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loggedIn} = this.props;
    return (
      <Router>
        <Fragment>
        <LoadingBar />
          {loggedIn !== null && (
          <div >
            <Nav />
            </div>
          )}
              <div>
                <Switch>
                  <PrivateRoute path='/' exact component={Home} loggedIn={loggedIn} />
                  <PrivateRoute path='/leaderboard' exact component={LeaderBoard} loggedIn={loggedIn} />
                  <PrivateRoute path='/add' exact component={NewPoll} loggedIn={loggedIn} />
                  <PrivateRoute path='/questions/:id' exact component={Question} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route component={Error} />
                </Switch>
              </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
