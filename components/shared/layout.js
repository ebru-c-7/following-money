import { useSession } from "next-auth/client";

import Navbar from "./navbar";

import classes from "./layout.module.css";

function Layout(props) {
  const [session] = useSession();
  if (!session || !session.user) return props.children;

  return (
    <div className={classes.Layout}>
      <p className={classes.Logo}>Logo</p>
      <p className={classes.Head}>{"Quote - " + session.user.name}</p>

      <Navbar {...props}>{props.children}</Navbar>
    </div>
  );
}

export default Layout;
