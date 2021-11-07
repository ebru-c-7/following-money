import React from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = (props) => (
  <span className="tip-container">
    <i>?</i>
    <ReactTooltip multiline type={props.type || "info"} />
  </span>
);

export default ToolTip;
