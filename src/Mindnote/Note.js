import React, { useState, useEffect, useContext } from "react";
import { ITEM_TYPE, LIST_ACTION_TYPE } from "./enums";
import ItemContext from "./ItemContext";
import { md } from "./mdParser";

const Note = (props) => {
  const { isShowNote, selectedItem, selectedNote } = props;
  const { dispatchNotes, dispatchNodes, getNote, getNode } = useContext(
    ItemContext
  );
  const [note, setNote] = useState(null);
  useEffect(() => {
    setNote(getNote(selectedNote));
  }, [selectedNote]);
  const [editContent, setEditContent] = useState("");
  useEffect(() => {
    if (note) {
      setEditContent(note.content);
    }
  }, [note]);
  const modifyContent = (newContent) => {
    setEditContent(newContent);
    dispatchNotes({
      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
      items: [{ ...note, content: newContent }],
    });
  };
  const [editTitle, setEditTitle] = useState("");
  useEffect(() => {
    if (note) {
      setEditTitle(note.title);
    }
  }, [note]);
  const modifyTitle = (newTitle) => {
    setEditTitle(newTitle);
    dispatchNotes({
      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
      items: [{ ...note, title: newTitle }],
    });
    dispatchNodes({
      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
      items: [{ ...getNode(selectedItem.id), title: newTitle }],
    });
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
      {/* <button type="button" className="tool-close-btn" onClick={closeTool}>
        <i className="fas fa-times"></i>
      </button> */}
      {note ? (
        <>
          <NoteTitle title={editTitle} modifyTitle={modifyTitle} />
          <TextArea content={editContent} modifyContent={modifyContent} />
        </>
      ) : (
        <div className="no-note">Please select a node to edit note.</div>
      )}
    </div>
  );
};

const NoteTitle = (props) => {
  const { title, modifyTitle } = props;
  return (
    <div className="note-title">
      <input
        type="text"
        name="note-title"
        className="title-content"
        value={title}
        placeholder="Add Note Title Here..."
        onChange={(e) => modifyTitle(e.target.value)}
      />
    </div>
  );
};

const NoteView = (props) => {
  const { content } = props;
  return (
    <div
      className="text-view"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
  );
};

const TextArea = (props) => {
  const { content, modifyContent } = props;
  return (
    <div className="text-edit">
      <textarea
        className="text-content"
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
