import { signOut } from "next-auth/client";
import Link from "next/link";
import { Fragment } from "react";

import classes from "./navbar.module.css";

function Navbar(props) {
  const data = [
    {
      head: "Cost",
      list: [
        {
          title: "New Entry",
          link: "/cost/new",
        },
        {
          title: "Records",
          link: "/cost/all",
        },
      ],
    },
    {
      head: "Revenue",
      list: [
        {
          title: "New Entry",
          link: "/revenue/new",
        },
        {
          title: "Records",
          link: "/revenue/all",
        },
      ],
    },
  ];

  const items = data.map((sec) => (
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

  return (
    <Fragment>
      <div className={classes.Container}>
        {/* <p>{props.user.name}</p> */}
        <nav>{items}</nav>
        <button onClick={() => signOut("google")}>Logout</button>
      </div>
      <div className={classes.Content}>{props.children}</div>
    </Fragment>
  );
}

export default Navbar;
