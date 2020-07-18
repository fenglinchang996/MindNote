import React from "react";
import Header from "../Header";
import Canvas from "./Canvas";
import Tool from "./Tool";

const Mindnote = (props) => {
  return (
    <div className="mindnote">
      <Header>
        <div className="go-back-btn">
          <i className="fas fa-chevron-left"></i>&nbsp; Back
        </div>
      </Header>
      <Canvas />
      <Tool />
    </div>
  );
};

export default Mindnote;
