import classes from "./record.module.css";

function RecordItem(props) {
  const showInstallment = props.installment != 1;
  const showRepeat = props.repeat != 0;

  const date = new Date(props.date.split("T")[0]);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("tr", { month: "long" }).format(date);
  const year = date.getFullYear();
  const weekday = new Intl.DateTimeFormat("tr", { weekday: "long" }).format(
    date
  );

  return (
    <div className={classes.Item} title={props.note}>
      <div className={classes.Date}>
        <p>{day}</p>
        <p>{month}</p>
        <p>{weekday}</p>
        <p className={classes.Year}>{year}</p>
      </div>
      <div>{`${props.source || props.type} - ${props.name}`}</div>
      <div>
        {(showInstallment && props.installment) || (showRepeat && props.repeat)}
      </div>
      <div>{props.amount}</div>
    </div>
  );
}

export default RecordItem;
