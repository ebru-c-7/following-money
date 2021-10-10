import React from "react";
import { DARK_MODE } from "../../../store/reducers";

const Icon = (props) => {
  const style1 = {
    width: "20px",
    height: "13px",
    backgroundColor: "#3d4651",
    borderRadius: "2px",
  };
  const style2 = {
    width: "20px",
    height: "13px",
    backgroundColor:
      props.mode === DARK_MODE ? "var(--sunny)" : "var(--purple)",
    borderRadius: "2px",
  };

  return (
    <div className={props.className}>
      <div style={style1}></div>
      <div style={style2}></div>
    </div>
  );
};

export default Icon;
