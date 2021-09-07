function Input(props) {
  const { name, label, placeholder, type, config } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} placeholder={placeholder} type={type} {...config} />
    </div>
  );
}

export default Input;
