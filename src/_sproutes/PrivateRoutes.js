import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../_spjwt/_spservices";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = AuthenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: "/_spauthentication/Login",
              state: { from: props.location },
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
