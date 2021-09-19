import React from "react";

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
    backgroundColor: "#3c71b5",
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
