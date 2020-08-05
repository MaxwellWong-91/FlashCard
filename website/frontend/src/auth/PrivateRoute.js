import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import {UserContext} from "../context/UserContext";


const PrivateRoute = ({ component: Component, ...rest}) => {
  const {user, setUser} = useContext(UserContext);
  const isLoggedIn = user;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: {from: props.location}}} />
        )
      }
    />
  )
}

export default PrivateRoute;