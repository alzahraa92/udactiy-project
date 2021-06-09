import React from 'react';
import { Route,withRouter,Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

  return (
    <Route {...rest} render={function(props) {
      return (
        rest.loggedIn
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: redirect
          }} />
      )}
    } />
  );
}

export default withRouter(PrivateRoute);
