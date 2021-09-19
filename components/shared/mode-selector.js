import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../../store/reducers/modeSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

import classes from "./mode-selector.module.css";
import { DARK_MODE } from "../../store/reducers";

function ModeSelector(props) {
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  const changeHandler = () => dispatch(changeMode());

  const iconClass = [
    classes.Icon,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <FontAwesomeIcon
      icon={faLightbulb}
      className={iconClass}
      size={props.size || "3x"}
      onClick={changeHandler}
    />
  );
}

export default ModeSelector;
