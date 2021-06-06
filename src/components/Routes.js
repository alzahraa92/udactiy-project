import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import NewPoll from "./NewPoll";
import AboutQu from "./AboutQu"
import Error from "./Error"
import Logout from './Logout'

function Routes(props) {
  return <div className="container">
    <Switch>
      {
        props.notLoggedIn ? <Route path='/' exact component={Login}/> :
          <Fragment>
            <Route path='/home' exact component={Dashboard} />
            <Route path='/leaderboard' exact component={LeaderBoard} />
            <Route path='/add' component={NewPoll}/>
            <Route path="/questions/:id" component={AboutQu} />
            <Route exact path='/' component={Logout} />
          </Fragment>
      }
      <Route component={Error} />
    </Switch>
  </div>;
}

Routes.propTypes = {notLoggedIn: PropTypes.any};

export default Routes;