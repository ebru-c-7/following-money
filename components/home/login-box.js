import React from "react";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import classes from "./login-box.module.css";
import { DARK_MODE } from "../../store/reducers";

function LoginBox() {
  const mode = useSelector((state) => state.mode.mode);

  const boxClass = [
    classes.LoginBox,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <div className={boxClass}>
      <React.Fragment>
        <h1>
          Follow <sub>the</sub> Money
        </h1>
        <h3>an easy way to balance your costs & revenues</h3>
        <button
          title="Sign in with Google"
          className={classes.Button}
          onClick={() =>
            signIn("google", { callbackUrl: process.env.CALLBACK_URL })
          }
        >
          <p className={classes.ButtonText}>Join With </p>
          <FontAwesomeIcon
            icon={faGoogle}
            className={classes.Icon}
            size={"lg"}
          />
        </button>
      </React.Fragment>
    </div>
  );
}

export default LoginBox;
