import React, { useState } from "react";
import "./Member.css";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { auth, db } from "../firebase";
import { AuthToMyDocsRoute } from "../AuthRoute";

const Member = (props) => {
  let { path, url } = useRouteMatch();
  return (
    <div className="form">
      <Switch>
        <AuthToMyDocsRoute path={`${path}/signup`}>
          <SignUp />
        </AuthToMyDocsRoute>
        <AuthToMyDocsRoute path={`${path}/login`}>
          <LogIn />
        </AuthToMyDocsRoute>
        <Route path={`${path}`}>
          <Redirect to={`${url}/login`} />
        </Route>
      </Switch>
    </div>
  );
};

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const createUser = (email, password, name) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid, email } = userCredential.user;
        console.log(uid);
        console.log({ email, name, ownDocs: [] });
        db.collection("users")
          .doc(uid)
          .set({
            email,
            name,
            ownDocs: [],
          })
          .then(() => {
            console.log("User successfully added!");
          })
          .catch((error) => {
            console.error("Error adding user: ", error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(`${error.code}: ${error.message}`);
      });
  };
  return (
    <>
      <h2 className="title">Sign Up</h2>
      <input
        name="email"
        type="email"
        placeholder="Eamil"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        className="btn native-login-btn"
        onClick={() => {
          createUser(email, password, name);
        }}
      >
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

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LogInUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      console.log(`${error.code}: ${error.message}`);
    });
  };
  return (
    <>
      <h2 className="title">Log In</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="btn native-login-btn"
        onClick={() => LogInUser(email, password)}
      >
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
