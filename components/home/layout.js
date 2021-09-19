import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";

import LoginBox from "./login-box";
import ModeSelector from "../shared/mode-selector";

import classes from "./layout.module.css";

function Layout() {
  const mode = useSelector((state) => state.mode.mode);

  const layoutClass = [
    classes.Layout,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <div className={layoutClass}>
      <ModeSelector />
      <LoginBox />
    </div>
  );
}

export default Layout;
