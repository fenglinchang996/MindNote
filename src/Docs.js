import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import "./Docs.css";
import docPic from "./Mind-Map-Paper.svg";
import { db, DB } from "./firebase";
import { AuthToLogInRoute } from "./AuthRoute";
import UserContext from "./UserContext";

const Docs = (props) => {
  const { path, url } = useRouteMatch();

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

const wrapNewDoc = (isFirstNewDoc) => (props) => {
  const user = useContext(UserContext);
  const history = useHistory();
  // Create new mindnote
  const createNewMindnoteToDB = async () => {
    if (user) {
      try {
        // Create mindnote
        const mindnoteRef = await db.collection("mindnotes").add({
          nodeList: [],
          curveList: [],
          noteList: [],
        });
        // Create doc
        const mindnoteId = mindnoteRef.id;
        const docRef = await db.collection("docs").add({
          title: "",
          creatorId: user.uid,
          createDate: DB.Timestamp.fromDate(new Date()),
          modifyData: DB.Timestamp.fromDate(new Date()),
          mindnoteId: mindnoteId,
        });
        const docId = docRef.id;
        // Add docId to user ownDocs array
        await db
          .collection("users")
          .doc(user.uid)
          .update({
            ownDocs: DB.FieldValue.arrayUnion(docId),
          });
        history.push(`/mindnote/${mindnoteId}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const addMindNoteBtn = (
    <button
      className="add-mindnote-btn"
      onClick={() => createNewMindnoteToDB()}
    >
      <i className="fas fa-plus"></i>
    </button>
  );
  return isFirstNewDoc ? (
    <div className="first-doc">
      {addMindNoteBtn}
      <p className="add-first-doc-text">
        Click &nbsp;<i className="fas fa-plus"></i>&nbsp; Button to Create Your
        First Mindnote!
      </p>
    </div>
  ) : (
    <div className="doc new-doc">{addMindNoteBtn}</div>
  );
};

const FirstNewDoc = wrapNewDoc(true);
const NewDoc = wrapNewDoc(false);

const DocList = (props) => {
  const { path, url } = useRouteMatch();
  const [docList, setDocList] = useState([]);
  const user = useContext(UserContext);

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
        db.collection("docs")
          .where("creatorId", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            const myDocList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocList(myDocList);
          });
        setDocList([]);
        break;
      default:
        break;
    }
  }, [path]);

  // Delete doc
  const deleteDoc = async (doc) => {
    setIsLoading(true);
    const { creatorId, mindnoteId, id: docId } = doc;
    // Remove docId from owner ownDocs
    try {
      const ownerRef = db.collection("users").doc(creatorId);
      await ownerRef.update({ ownDocs: DB.FieldValue.arrayRemove(docId) });
      console.log("Doc successfully removed from owner ownDocs!");
    } catch (error) {
      console.error("Error removing doc from owner ownDocs: ", error);
    }
    // Remove mindnote
    try {
      await db.collection("mindnotes").doc(mindnoteId).delete();
      console.log("Mindnote successfully deleted!");
    } catch (error) {
      console.log("Error removing mindnote!");
    }
    // Remove doc
    try {
      await db.collection("docs").doc(docId).delete();
      console.log("Doc successfully deleted!");
    } catch (error) {
      console.log("Error removing doc!");
    }
    // Re-get docs
    getMyDocsFromDB();
    setIsLoading(false);
  };

  return (
    <div>
      <div className="doc-list">
        {docList.length > 0 &&
          docList.map((doc) => {
            const { id, title, mindnoteId } = doc;
            return (
              <div key={id} className="doc">
                <div className="delete-doc-btn" onClick={() => deleteDoc(doc)}>
                  <i className="fas fa-trash-alt"></i>
                </div>
                <Link to={`/mindnote/${id}/${mindnoteId}`}>
                  <div className="doc-diagram">
                    <img src={docPic} />
                  </div>
                  <div className="doc-info">
                    <span className="doc-title">
                      {title && title !== "" ? title : "Untitled Mindnote"}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      {path === "/docs/my" &&
        (docList.length === 0 ? <FirstNewDoc /> : <NewDoc />)}
    </div>
  );
};

export default Docs;
