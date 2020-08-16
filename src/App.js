import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Header from "./header";
import Home from "./home";
import Docs from "./docs";
import Member from "./member";
import Mindnote from "./mindnote";
import { auth, db } from "./firebase";
import { AuthToMyDocsRoute } from "./AuthRoute";
import UserContext from "./UserContext";

const App = () => {
  const [user, setUser] = useState(undefined);
  // Check Log In Status and retrive user data
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("AuthChange");
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
            <Route path="/mindnote/:docId/:mindnoteId">
              <Header />
              <Mindnote />
            </Route>
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
