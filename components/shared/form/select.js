import classes from "./form.module.css";

function Select(props) {
  const { name, options, label, config } = props;

  const optionItems = options.map((item) => (
    <option className={classes.Option} key={item.value} value={item.value}>
      {item.text}
    </option>
  ));

  return (
    <div className={classes.Container}>
      <label htmlFor={name}>{label}</label>
      <select className={classes.Select} name={name} id={name} {...config}>
        {optionItems}
      </select>
    </div>
  );
}

export default Select;
