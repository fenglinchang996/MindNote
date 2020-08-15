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
import Loading from "../Loading";

const Member = (props) => {
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <div className="form-wrapper">
      <div className="form">
        <Switch>
          <Route path={`${path}/signup`}>
            {isNewUser ? (
              <Welcome
                message="Your account is created! Continue and log in."
                action={() => {
                  setIsNewUser(false);
                  history.push("/member/login");
                }}
              />
            ) : (
              <SignUp setIsLoading={setIsLoading} setIsNewUser={setIsNewUser} />
            )}
          </Route>
          <AuthToMyDocsRoute path={`${path}/login`}>
            <LogIn setIsLoading={setIsLoading} />
          </AuthToMyDocsRoute>
          <Route path={`${path}`}>
            <Redirect to={`${url}/login`} />
          </Route>
        </Switch>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const SignUp = (props) => {
  const { setIsLoading, setIsNewUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const createUser = (email, password, name) => {
    setIsLoading(true);
    if (name) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const { uid, email } = userCredential.user;
          db.collection("users")
            .doc(uid)
            .set({
              email,
              name,
              ownDocs: [],
            })
            .then(() => {
              console.log("User successfully added!");
              setIsLoading(false);
              setIsNewUser(true);
            })
            .catch((error) => {
              console.error("Error adding user: ", error);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          switch (error.code) {
            case "auth/invalid-email":
              setError(
                "The email address is empty or not in valid format, please input the correct email address."
              );
              break;
            case "auth/email-already-in-use":
              setError(
                "The email address is already in use by another account, please sign up with other email address or log in."
              );
              break;
            case "auth/weak-password":
              setError("The password must be 6 characters long or more.");
              break;
            default:
              break;
          }
          console.log(`${error.code}: ${error.message}`);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError("The user name should not be empty.");
    }
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
      <p className="error-message">{error ? error : ""}</p>
      <button
        type="button"
        className="btn native-login-btn"
        onClick={() => {
          createUser(email, password, name);
        }}
      >
        Sign Up
      </button>
      {/* <div className="login-separator">
        <div className="line"></div>
        <div>or</div>
        <div className="line"></div>
      </div>
      <button type="button" className="btn fb-login-btn">
        Sign up with Facebook
      </button> */}
      <p className="change-auth">
        Already have an account？
        <Link to="./login">&nbsp;Log In&nbsp;</Link>
      </p>
    </>
  );
};

const Welcome = (props) => {
  const { message, action } = props;
  return (
    <div className="pop-up-window">
      <div className="pop-up-message">{message}</div>
      <button type="button" className="native-login-btn" onClick={action}>
        Continue
      </button>
    </div>
  );
};

const LogIn = (props) => {
  const { setIsLoading } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const LogInUser = (email, password) => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        // Handle Errors here.
        switch (error.code) {
          case "auth/user-not-found":
            setError(
              "There is no user corresponding to the email, please check the email address or sign up an new account."
            );
            break;
          case "auth/wrong-password":
            setError("The password is empty or not correct, please try again.");
            break;
          case "auth/invalid-email":
            setError(
              "The email address is empty or not in valid format, please try again."
            );
            break;
          default:
            break;
        }
        console.log(`${error.code}: ${error.message}`);
        setIsLoading(false);
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
      <p className="error-message">{error ? error : ""}</p>
      <button
        type="button"
        className="btn native-login-btn"
        onClick={() => LogInUser(email, password)}
      >
        Log In
      </button>
      {/* <div className="login-separator">
        <div className="line"></div>
        <div>or</div>
        <div className="line"></div>
      </div>
      <button type="button" className="btn fb-login-btn">
        Log in with Facebook
      </button> */}
      <p className="change-auth">
        Dont't have an account？
        <Link to="./signup">&nbsp;Sign Up&nbsp;</Link>
      </p>
    </>
  );
};

export default Member;
