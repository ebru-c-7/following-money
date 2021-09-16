import { useState } from "react";

import Input from "./input";
import Select from "./select";

function Form(props) {
  const { data, addedData } = props;
  const [openItem, setOpenItem] = useState(null);

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
  };

  const toggleInputHandler = (id) =>
    openItem === id ? setOpenItem(null) : setOpenItem(id);

  const items = data.map((item) => {
    if (item.element === "input") {
      return <Input key={item.name} {...item} />;
    }
    if (item.element === "select") {
      return <Select key={item.name} {...item} />;
    }
  });

  const addedItems = addedData.map((item, i) => {
    return (
      <div key={item.id}>
        <button
          type="button"
          key={item.id}
          onClick={toggleInputHandler.bind(this, item.id)}
        >
          {item.text}
        </button>
        {openItem === item.id && <Input {...item.data} />}
      </div>
    );
  });

  return (
    <div>
      {props.children}
      <form onSubmit={formHandler}>
        {items}
        {addedItems}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
