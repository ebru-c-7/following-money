import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";
import { links } from "./navbar-links";

import ModeSelector from "./mode-selector";

import classes from "./navbar.module.css";

function Navbar(props) {
  const mode = useSelector((state) => state.mode.mode);
  const router = useRouter();

  const isActive = (link) => (router.pathname === link ? classes.Active : "");

  const items = links.map((sec) => (
    <section key={sec.head}>
      <h3>{sec.head}</h3>
      <ul>
        {sec.list.map((li) => (
          <li className={classes.Item} key={li.title}>
            <Link href={li.link}>
              <a className={isActive(li.link)}>{li.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ));

  const containerClass = [
    classes.Container,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <Fragment>
      <div className={containerClass}>
        {/* <p>{props.user.name}</p> */}
        <nav>
          {items}
          <section className={classes.MobileOptions}>
            <ModeSelector style={{ position: "relative" }} size={"2x"} />
            <button
              className={classes.Button}
              onClick={() => signOut("google")}
            >
              Logout
            </button>
          </section>
        </nav>
        <div className={classes.DesktopOptions}>
          <button className={classes.Button} onClick={() => signOut("google")}>
            Logout
          </button>
          <ModeSelector style={{ position: "relative" }} size={"2x"} />
        </div>
      </div>
      <div className={classes.Content}>{props.children}</div>
    </Fragment>
  );
}

export default Navbar;
