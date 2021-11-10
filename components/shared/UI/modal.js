import React from "react";
import reactDom from "react-dom";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../../store/reducers";
import { arrayToClass } from "../../../util/lib";

import classes from "./modal.module.css";

const Modal = (props) => {
  const mode = useSelector((state) => state.mode.mode);
  const modalClass = arrayToClass([
    classes.Modal,
    [mode === DARK_MODE, classes.Dark],
  ]);
  const modal = (
    <div className={classes.Container} onClick={props.onClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <span className="bold" onClick={props.onClose}>
          x
        </span>
        {props.children}
      </div>
    </div>
  );

  return reactDom.createPortal(modal, document.getElementById("modal-root"));
};

export default Modal;
