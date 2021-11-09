import React from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = (props) => (
  <span className={props.noicon ? "tip-container_invisible" : "tip-container"}>
    {!props.noicon && <i>?</i>}
    <ReactTooltip multiline type={props.type || "info"} />
  </span>
);

export default ToolTip;
