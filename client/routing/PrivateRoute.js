import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('authToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )}
  />
);

export default PrivateRoute;
