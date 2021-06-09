import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';
import Login from './components/Login';
import Nav from './components/Nav';
import NewPoll from './components/NewPoll';
import Question from './components/Question';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loggedIn} = this.props;
    return (
      <Router>
        <Fragment>
          <div >
            <Nav />
              <div>
                <Switch>
                  <PrivateRoute path='/' exact component={Home} loggedIn={loggedIn} />
                  <PrivateRoute path='/leaderboard' exact component={LeaderBoard} loggedIn={loggedIn} />
                  <PrivateRoute path='/add' exact component={NewPoll} loggedIn={loggedIn} />
                  <PrivateRoute path='/questions/:id' exact component={Question} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route  path='/' component={Error} />
                </Switch>
              </div>
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
