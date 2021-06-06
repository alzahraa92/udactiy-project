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

function Private(props) {
  return <div >
    <Switch>
      {
        props.nologin ? <Route exact path='/'  component={Login}/> :
          <Fragment>
            <Route path='/home'  component={Dashboard} />
            <Route exact path='/leaderboard'  component={LeaderBoard} />
            <Route exact path='/add' component={NewPoll}/>
            <Route exact path="/questions/:id" component={AboutQu} />
            <Route exact path='/' component={Logout} />
          </Fragment>
      }
      <Route component={Error} />
    </Switch>
  </div>;
}

Private.propTypes = {nologin: PropTypes.any};

export default Private;
