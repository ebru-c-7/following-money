import { useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";

import Navbar from "./navbar";
import ModeSelector from "./mode-selector";

import classes from "./layout.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMode } from "../../store/reducers/modeSlice";

function Layout(props) {
  const [session] = useSession();
  if (!session || !session.user) return props.children;

  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMode());
  }, []);

  const layoutClass = [
    classes.Layout,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <div className={layoutClass}>
      <div className={classes.Logo}>
        <p>Logo</p>
      </div>
      <div className={classes.Head}>
        <p>{"Quote - " + session.user.name}</p>
      </div>
      <ModeSelector size={"2x"} />
      <Navbar mode={mode} {...props}>
        {props.children}
      </Navbar>
    </div>
  );
}

export default Layout;
