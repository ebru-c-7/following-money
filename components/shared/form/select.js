function Select(props) {
  const { name, options, label, config } = props;

  const optionItems = options.map((item) => (
    <option key={item.value} value={item.value}>
      {item.text}
    </option>
  ));

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...config}>
        {optionItems}
      </select>
    </div>
  );
}

export default Select;
