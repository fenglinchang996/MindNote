import React, { useState, useEffect, useContext } from "react";
import { ITEM_TYPE, LIST_ACTION_TYPE, NOTE_MODE } from "./enums";
import ItemContext from "./ItemContext";
import { md } from "./mdParser";

const Note = (props) => {
  const { isShowNote, selectedItem, selectedNote } = props;
  const { dispatchNotes, dispatchNodes, getNote, getNode } = useContext(
    ItemContext
  );
  const [noteMode, setNoteMode] = useState(NOTE_MODE.EDIT_MODE);
  // Note
  const [note, setNote] = useState(null);
  useEffect(() => {
    setNote(getNote(selectedNote));
  }, [selectedNote]);
  // Note title
  const [editTitle, setEditTitle] = useState("");
  // Note content
  const [editContent, setEditContent] = useState("");
  useEffect(() => {
    if (note) {
      setEditContent(note.content);
      setEditTitle(note.title);
    }
  }, [note]);
  useEffect(() => {
    if (note) {
      dispatchNotes({
        type: LIST_ACTION_TYPE.UPDATE_ITEMS,
        items: [{ ...note, title: editTitle, content: editContent }],
      });
      dispatchNodes({
        type: LIST_ACTION_TYPE.UPDATE_ITEMS,
        items: [{ ...getNode(selectedItem.id), title: editTitle }],
      });
    }
  }, [editTitle, editContent]);
  const modifyContent = (newContent) => {
    setEditContent(newContent);
  };
  const modifyTitle = (newTitle) => {
    setEditTitle(newTitle);
  };
  return (
    <div
      className="tool-box note"
      style={{
        display: isShowNote ? "block" : "none",
      }}
    >
      <div className="tool-main-title">
        Note
        <hr className="hori-sep" />
      </div>
      {noteMode === NOTE_MODE.EDIT_MODE ? (
        <button
          type="button"
          className="tool-item edit-mode-btn"
          onClick={() => setNoteMode(NOTE_MODE.VIEW_MODE)}
        >
          <i className="fas fa-eye"></i>
        </button>
      ) : (
        ""
      )}
      {noteMode === NOTE_MODE.VIEW_MODE ? (
        <button
          type="button"
          className="tool-item view-mode-btn"
          onClick={() => setNoteMode(NOTE_MODE.EDIT_MODE)}
        >
          <i className="fas fa-pen"></i>
        </button>
      ) : (
        ""
      )}
      {note ? (
        <>
          {noteMode === NOTE_MODE.EDIT_MODE ? (
            <>
              <TitleEdit title={editTitle} modifyTitle={modifyTitle} />
              <TextEdit content={editContent} modifyContent={modifyContent} />
            </>
          ) : (
            ""
          )}
          {noteMode === NOTE_MODE.VIEW_MODE ? (
            <>
              <TitleView title={editTitle} />
              <TextView content={editContent} />
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="no-note">Please select a node to edit note.</div>
      )}
    </div>
  );
};

const TitleEdit = (props) => {
  const { title, modifyTitle } = props;
  return (
    <div className="title-edit">
      <input
        type="text"
        className="title-content"
        value={title}
        placeholder="Add Note Title Here..."
        onChange={(e) => modifyTitle(e.target.value)}
      />
    </div>
  );
};

const TitleView = (props) => {
  const { title } = props;
  return (
    <div className="title-view" title={title}>{`${title.slice(0, 24)}...`}</div>
  );
};

const TextView = (props) => {
  const { content } = props;
  return (
    <div
      className="text-view"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
  );
};

const TextEdit = (props) => {
  const { content, modifyContent } = props;
  return (
    <div className="text-edit">
      <textarea
        className="textarea"
        placeholder="Type your note..."
        value={content}
        onChange={(e) => modifyContent(e.target.value)}
      ></textarea>
    </div>
  );
};

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <div className="tool-list">
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <i className="fas fa-font"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
        <div className="tool-item tool-select">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-highlighter"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-bold"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-italic"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-underline"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-strikethrough"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-list-ul"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-list-ol"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-table"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-link"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-image"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
