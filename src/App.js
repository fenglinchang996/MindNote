import React, { useState, useEffect, useContext } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  NavLink,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Docs from "./Docs";
import Member from "./Member";
import Mindnote from "./Mindnote";
import { auth, db } from "./firebase";
import { AuthToLogInRoute, AuthToMyDocsRoute } from "./AuthRoute";
import UserContext from "./UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  // Check Log In Status and retrive user data
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        const { uid } = authUser;
        // Retrive user data from database
        db.collection("users")
          .doc(uid)
          .get()
          .then((userDoc) => {
            if (userDoc.exists) {
              const { email, name, ownDocs } = userDoc.data();
              setUser({ uid, email, name, ownDocs });
              console.log({ uid, email, name, ownDocs });
            } else {
              // userDoc.data() will be undefined in this case
              console.log("No such user!");
            }
          })
          .catch((error) => {
            console.log("Error getting user:", error);
          });
      } else {
        // User is signed out.
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="container">
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Route path="/docs">
              <Header />
              <Docs />
            </Route>
            <AuthToLogInRoute path="/mindnote/:docId/:mindnoteId">
              <Header />
              <Mindnote />
            </AuthToLogInRoute>
            <Route path="/member">
              <Header />
              <Member />
            </Route>
            <AuthToMyDocsRoute path="/home">
              <Header />
              <Home />
            </AuthToMyDocsRoute>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
