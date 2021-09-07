import React from "react";
import { signIn } from "next-auth/client";

import classes from "./login-box.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginBox() {
  return (
    <div className={classes.LoginBox}>
      <React.Fragment>
        <p>box</p>
        <button
          onClick={() =>
            signIn("google", { callbackUrl: process.env.CALLBACK_URL })
          }
        >
          <FontAwesomeIcon icon={faGoogle} color={"pink"} size={"lg"} />
          <span>Start With Google</span>
        </button>
      </React.Fragment>
    </div>
  );
}

export default LoginBox;
