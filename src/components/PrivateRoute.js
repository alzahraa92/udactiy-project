import React from 'react';
import { Route} from 'react-router-dom';
import Error from "./Error";

function PrivateRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

  return (
    <Route {...rest} render={function(props) {
      return (
        rest.loggedIn
        ? <Component {...props} />
        : <Error to={{
          pathname: '/login',
          state: redirect
          }} />
      )}
    } />
  );
}

export default (PrivateRoute);
