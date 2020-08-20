import React from "react";
import ToolBtn from "./widget/ToolBtn";
import ToolText from "./widget/ToolText";

const SaveTool = (props) => {
  const { isSaving, autoSaveCount, saveMindnoteToDB } = props;
  const getSavingString = (isSaving, autoSaveCount) => {
    if (isSaving) return "Saving...";
    if (autoSaveCount === 0) return "Saved";
    else return "Not Saved";
  };
  return (
    <div className="tool-box save-tool">
      {isSaving ? (
        <Saving />
      ) : (
        <ToolBtn fa="save" action={saveMindnoteToDB} title="Save" />
      )}
      <ToolText width="80px" textAlign="left">
        {getSavingString(isSaving, autoSaveCount)}
      </ToolText>
    </div>
  );
};

const Saving = (props) => {
  return (
    <div className="tool-item">
      <div className="spinner saving-icon">
        <i className="fas fa-sync-alt"></i>
      </div>
    </div>
  );
};

export default SaveTool;
