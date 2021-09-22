import { signOut } from "next-auth/client";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";
import { links } from "./navbar-links";

import ModeSelector from "./mode-selector";

import classes from "./navbar.module.css";

function Navbar(props) {
  const mode = useSelector((state) => state.mode.mode);

  const items = links.map((sec) => (
    <section key={sec.head}>
      <h3>{sec.head}</h3>
      <ul>
        {sec.list.map((li) => (
          <li key={li.title}>
            <Link href={li.link}>
              <a>{li.title}</a>
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
        <nav>{items}</nav>
        <button className={classes.Button} onClick={() => signOut("google")}>
          Logout
        </button>
        <ModeSelector style={{ position: "relative" }} size={"2x"} />
      </div>
      <div className={classes.Content}>{props.children}</div>
    </Fragment>
  );
}

export default Navbar;
