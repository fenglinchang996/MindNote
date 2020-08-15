import React from "react";
import CommonTool from "./CommonTool";
import CurveTool from "./CurveTool";
import NodeTool from "./NodeTool";

const Tool = (props) => {
  const {
    isSaving,
    autoSaveCount,
    saveMindnoteToDB,
    showNodeTool,
    showCurveTool,
    showNote,
    selectedItem,
    docTitle,
    modifyDocTitle,
    calcMaxLevel,
    isShowNodeTool,
    closeNodeTool,
    modifyNodeStyle,
    isShowCurveTool,
    closeCurveTool,
    modifyCurveStyle,
  } = props;
  const maxLevel = calcMaxLevel();
  return (
    <>
      <CommonTool
        isSaving={isSaving}
        autoSaveCount={autoSaveCount}
        saveMindnoteToDB={saveMindnoteToDB}
        showNodeTool={showNodeTool}
        showCurveTool={showCurveTool}
        showNote={showNote}
        selectedItem={selectedItem}
        docTitle={docTitle}
        modifyDocTitle={modifyDocTitle}
      />
      <NodeTool
        maxLevel={maxLevel}
        isShowNodeTool={isShowNodeTool}
        closeNodeTool={closeNodeTool}
        modifyNodeStyle={modifyNodeStyle}
        selectedItem={selectedItem}
      />
      <CurveTool
        maxLevel={maxLevel}
        isShowCurveTool={isShowCurveTool}
        closeCurveTool={closeCurveTool}
        modifyCurveStyle={modifyCurveStyle}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default Tool;
