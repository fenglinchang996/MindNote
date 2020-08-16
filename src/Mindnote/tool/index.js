import React from "react";
import CommonTool from "./CommonTool";
import CurveTool from "./CurveTool";
import NodeTool from "./NodeTool";

const Tool = (props) => {
  const {
    showNodeTool,
    showCurveTool,
    showNote,
    selectedItem,
    deleteSelectedNode,
    docTitle,
    modifyDocTitle,
    maxLevel,
    isShowNodeTool,
    closeNodeTool,
    modifyNodeStyle,
    isShowCurveTool,
    closeCurveTool,
    modifyCurveStyle,
  } = props;
  return (
    <>
      <CommonTool
        showNodeTool={showNodeTool}
        showCurveTool={showCurveTool}
        showNote={showNote}
        deleteSelectedNode={deleteSelectedNode}
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
