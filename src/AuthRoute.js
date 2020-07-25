import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

// AuthRoute
const wrapAuthRoute = ({ isAuthTo = null, nonAuthTo = null } = {}) => (
  props
) => {
  const user = useContext(UserContext);
  const { children } = props;
  if (isAuthTo && user) return <Route {...props}>{isAuthTo}</Route>;
  if (nonAuthTo && !user) return <Route {...props}>{nonAuthTo}</Route>;
  return <Route {...props}>{children}</Route>;
};

const AuthToLogInRoute = wrapAuthRoute({
  nonAuthTo: <Redirect to="/member/login" />,
});
const AuthToMyDocsRoute = wrapAuthRoute({
  isAuthTo: <Redirect to="/docs/my" />,
});

export { AuthToLogInRoute, AuthToMyDocsRoute };
