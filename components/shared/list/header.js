import classes from "./header.module.css";

const Header = (props) => (
  <>
    <h1 className={classes.Header}>{props.children}</h1>
    <hr />
  </>
);

export default Header;
