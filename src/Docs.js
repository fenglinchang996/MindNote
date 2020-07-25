import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Redirect,
  Switch,
  Route,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import "./Docs.css";
import docPic from "./Mind-Map-Paper.svg";
import { db } from "./firebase";
import { AuthToLogInRoute } from "./AuthRoute";

const Docs = (props) => {
  const { path, url } = useRouteMatch();

  // Create new docs
  const createNewMindnoteToDB = () => {};

  return (
    <div className="docs">
      <Switch>
        <Route path={`${path}/public`}>
          <DocList />
        </Route>
        <AuthToLogInRoute path={`${path}/my`}>
          <DocList />
        </AuthToLogInRoute>
        <Route path={`${path}`}>
          <Redirect to={`${path}/public`} />
        </Route>
      </Switch>
    </div>
  );
};

const DocList = (props) => {
  const { path, url } = useRouteMatch();
  const [docList, setDocList] = useState([]);

  // Get docs from DB
  useEffect(() => {
    switch (path) {
      case "/docs/public":
        db.collection("docs")
          .get()
          .then((querySnapshot) => {
            const publicDocList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocList(publicDocList);
          });
        break;
      case "/docs/my":
        setDocList([]);
        break;
      default:
        break;
    }
  }, [path]);

  return (
    <div className="doc-list">
      {docList.map((doc) => {
        const { id, title, mindnoteId } = doc;
        return (
          <Link key={id} to={`/mindnote/${mindnoteId}`}>
            <div className="doc">
              <div className="doc-diagram">
                <img src={docPic} />
              </div>
              <div className="doc-info">
                <span className="doc-title">{title}</span>
              </div>
            </div>
          </Link>
        );
      })}
      <div className="doc new-doc">
        <button className="add-mindnote-btn">
          <Link to="/mindnote">
            <i className="fas fa-plus"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Docs;
