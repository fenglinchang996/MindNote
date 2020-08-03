import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";
import Loading from "./Loading";
import Header from "./Header";

// AuthRoute
const wrapAuthRoute = ({ isAuthTo = null, nonAuthTo = null } = {}) => (
  props
) => {
  const user = useContext(UserContext);
  const { children } = props;
  if (user === undefined)
    return (
      <div>
        <Header />
        <Loading />
      </div>
    );
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
