import React from "react";
import CommonTool from "./CommonTool";
import CurveTool from "./CurveTool";
import NodeTool from "./NodeTool";

const Tool = (props) => {
  const {
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
      />
      <CurveTool
        maxLevel={maxLevel}
        isShowCurveTool={isShowCurveTool}
        closeCurveTool={closeCurveTool}
        modifyCurveStyle={modifyCurveStyle}
      />
    </>
  );
};

export default Tool;
