import { useRef, useState } from "react";

import Input from "./input";
import Select from "./select";
import ToolTip from "../UI/tool-tip";

import { arrayToClass } from "../../../util/lib";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../../store/reducers";
import classes from "./form.module.css";

function Form(props) {
  const { data, addedData } = props;
  const [openItem, setOpenItem] = useState(null);
  const formRef = useRef();
  const mode = useSelector((state) => state.mode.mode);

  const formHandler = (e) => {
    e.preventDefault();
    const obj = {};
    for (const i of data.concat(addedData)) {
      obj[i.name] =
        e.target[i.name] && e.target[i.name].value
          ? e.target[i.name].value
          : i.data.config.defaultValue;
    }
    props.submitHandler(obj);
    formRef.current.reset();
    setOpenItem(null);
  };

  const toggleInputHandler = (item) =>
    openItem && openItem.id === item.id ? setOpenItem(null) : setOpenItem(item);

  const items = data.map((item) => {
    if (item.element === "input") {
      return <Input key={item.name} {...item} />;
    }
    if (item.element === "select") {
      return <Select key={item.name} {...item} />;
    }
  });

  const addedItems = addedData.map((item, i) => {
    if (item.data.config.isOpen && !openItem) setOpenItem(item);
    const buttonClass = arrayToClass([
      classes.AddedButton,
      [openItem && item.id === openItem.id, classes.Active],
    ]);
    return (
      <div key={item.id} data-tip={item.data.config.title}>
        <button
          className={buttonClass}
          type="button"
          key={item.id}
          onClick={toggleInputHandler.bind(this, item)}
        >
          {item.text}
        </button>
        <ToolTip type="info" />
      </div>
    );
  });

  return (
    <div className={arrayToClass([[mode === DARK_MODE, classes.Dark]])}>
      {props.children}
      <form ref={formRef} onSubmit={formHandler} className={classes.Form}>
        {items}
        <div className={classes.Options}>{addedItems}</div>
        {openItem && <Input {...openItem.data} />}
        <div className={classes.ButtonContainer}>
          <button type="submit">{props.buttonText || "Submit"}</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
