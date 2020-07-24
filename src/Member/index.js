import React from "react";
import "./Member.css";
import { Link, useRouteMatch, Route } from "react-router-dom";

const Member = (props) => {
  let { path, url } = useRouteMatch();
  return (
    <div className="form">
      <Route path={`${path}/signup`}>
        <Signup />
      </Route>
      <Route path={`${path}/login`}>
        <Login />
      </Route>
    </div>
  );
};

const Signup = () => {
  return (
    <>
      <h2 className="title">Sign Up</h2>
      <input name="email" type="email" placeholder="Eamil" required />
      <input name="name" type="text" placeholder="Name" required />
      <input name="password" type="password" placeholder="Password" required />
      <input
        name="verify-password"
        type="password"
        placeholder="Verify Password"
        required
      />
      <button type="button" className="btn native-login-btn">
        Sign Up
      </button>
      <div className="login-separator">
        <div className="line"></div>
        <div>or</div>
        <div className="line"></div>
      </div>
      <button type="button" className="btn fb-login-btn">
        Sign up with Facebook
      </button>
      <p>
        Already have an account？
        <Link to="./login">&nbsp;Log In&nbsp;</Link>
      </p>
    </>
  );
};

const Login = () => {
  return (
    <>
      <h2 className="title">Log In</h2>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="button" className="btn native-login-btn">
        Log In
      </button>
      <div className="login-separator">
        <div className="line"></div>
        <div>or</div>
        <div className="line"></div>
      </div>
      <button type="button" className="btn fb-login-btn">
        Log in with Facebook
      </button>
      <p>
        Dont't have an account？
        <Link to="./signup">&nbsp;Sign Up&nbsp;</Link>
      </p>
    </>
  );
};

export default Member;
