import classes from "./layout.module.css";
import LoginBox from "./login-box";

function Layout(){
    return <div className={classes.Layout}>
        <LoginBox />
    </div>
}

export default Layout;