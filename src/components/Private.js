import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import NewPoll from "./NewPoll";
import AboutQu from "./AboutQu"
import Error from "./Error"

function Private(props) {
  return <div >
    <Switch>
      {
        props.nologin ? <Route exact path='/' component={Login}/> :
          <Fragment>
            <Route  path='/home'  component={Home} />
            <Route  exact path='/leaderboard'  component={LeaderBoard} />
            <Route  exact path='/add' component={NewPoll}/>
            <Route  path="/questions/:id" component={AboutQu} />
          </Fragment>
      }
      <Route component={Error} />
    </Switch>
  </div>;
}

Private.propTypes = {nologin: PropTypes.any};

export default Private;
