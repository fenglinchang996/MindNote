import React, { useState, useEffect, useContext } from "react";
import { LIST_ACTION_TYPE, NOTE_MODE, MINDNOTE_MODE } from "../utils/enums";
import ItemContext from "../ItemContext";
import { md } from "../utils/mdParser";

const Note = (props) => {
  const { width, resizeNote, selectedItem, selectedNote, mindnoteMode } = props;
  const { dispatchNotes, dispatchNodes, getNote, getNode } = useContext(
    ItemContext
  );
  const [noteMode, setNoteMode] = useState(NOTE_MODE.EDIT_MODE);
  useEffect(() => {
    switch (mindnoteMode) {
      case MINDNOTE_MODE.VIEW_MODE:
        setNoteMode(NOTE_MODE.VIEW_MODE);
        break;
      case MINDNOTE_MODE.EDIT_MODE:
        setNoteMode(NOTE_MODE.EDIT_MODE);
        break;
      default:
        break;
    }
  }, [mindnoteMode]);
  // Note
  const [note, setNote] = useState(null);
  useEffect(() => {
    setNote(getNote(selectedNote));
  }, [selectedNote]);
  const modifyContent = (newContent) => {
    const newNote = { ...note, content: newContent };
    setNote(newNote);
    dispatchNotes({
      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
      items: [newNote],
    });
  };
  const modifyTitle = (newTitle) => {
    const newNote = { ...note, title: newTitle };
    setNote(newNote);
    dispatchNotes({
      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
      items: [newNote],
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
        width: `${width}px`,
      }}
    >
      <div className="tool-main-title">
        Note
        <hr className="hori-sep" />
      </div>
      <LeftEdge resizeNote={resizeNote} />
      <NoteModeBtn
        mindnoteMode={mindnoteMode}
        noteMode={noteMode}
        setNoteMode={setNoteMode}
      />
      <NoteBody
        note={note}
        noteMode={noteMode}
        modifyTitle={modifyTitle}
        modifyContent={modifyContent}
      />
    </div>
  );
};

const LeftEdge = (props) => {
  const { resizeNote } = props;
  return <div className="note-left-edge" onMouseDown={resizeNote}></div>;
};

const NoteBody = (props) => {
  const { note, noteMode, modifyTitle, modifyContent } = props;
  if (!note)
    return <div className="no-note">Please select a node to edit note.</div>;
  switch (noteMode) {
    case NOTE_MODE.EDIT_MODE:
      return (
        <>
          <TitleEdit title={note.title} modifyTitle={modifyTitle} />
          <TextEdit content={note.content} modifyContent={modifyContent} />
        </>
      );
    case NOTE_MODE.VIEW_MODE:
      return (
        <>
          <TitleView title={note.title} />
          <TextView content={note.content} />
        </>
      );
    default:
      return "";
  }
};

const NoteModeBtn = (props) => {
  const { mindnoteMode, noteMode, setNoteMode } = props;
  if (mindnoteMode === MINDNOTE_MODE.EDIT_MODE) {
    switch (noteMode) {
      case NOTE_MODE.VIEW_MODE:
        return (
          <button
            type="button"
            className="tool-item edit-mode-btn"
            onClick={() => setNoteMode(NOTE_MODE.EDIT_MODE)}
          >
            <i className="fas fa-pen"></i>
          </button>
        );
      case NOTE_MODE.EDIT_MODE:
        return (
          <button
            type="button"
            className="tool-item view-mode-btn"
            onClick={() => setNoteMode(NOTE_MODE.VIEW_MODE)}
          >
            <i className="fas fa-eye"></i>
          </button>
        );
      default:
        return <></>;
    }
  } else {
    return <></>;
  }
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
    <div className="title-view" title={title}>
      {title.length > 24 ? `${title.slice(0, 24)}...` : title}
    </div>
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

const TextView = (props) => {
  const { content } = props;
  return (
    <div
      className="text-view"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    ></div>
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
