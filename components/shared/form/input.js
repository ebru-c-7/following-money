import classes from "./form.module.css";

function Input(props) {
  const { name, label, placeholder, type, config } = props;

  return (
    <div className={classes.Container}>
      <label htmlFor={name}>{label}</label>
      <input
        className={classes.Input}
        id={name}
        placeholder={placeholder}
        type={type}
        {...config}
      />
    </div>
  );
}

export default Input;
