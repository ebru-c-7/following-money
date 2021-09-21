import { useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";
import Image from "next/image";

import Navbar from "./navbar";
import ModeSelector from "./mode-selector";

import classes from "./layout.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMode } from "../../store/reducers/modeSlice";
import axios from "axios";

function Layout(props) {
  const [session] = useSession();
  if (!session || !session.user) return props.children;

  const mode = useSelector((state) => state.mode.mode);
  const [quote, setQuote] = useState({ _id: "", content: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMode());
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    const { data } = await axios.get("/api/quotes");
    data.quoteObj
      ? setQuote(data.quoteObj)
      : setQuote({ _id: 0, content: "Welcome, let's balance!" });
  };

  const layoutClass = [
    classes.Layout,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");
  const src = mode === DARK_MODE ? "/logo-dark.svg" : "/logo-light.svg";

  if (!quote.content) return null;

  return (
    <div className={layoutClass}>
      <div className={classes.Logo}>
        <Image src={src} alt="logo" width={80} height={80} />
      </div>
      <div className={classes.Head}>
        <p>{quote.content}</p>
      </div>
      <ModeSelector size={"2x"} />
      <Navbar mode={mode} {...props}>
        {props.children}
      </Navbar>
    </div>
  );
}

export default Layout;
