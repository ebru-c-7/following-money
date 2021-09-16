import classes from "./record.module.css";

function RecordItem(props) {
  let config = null;
  let title = "";
  if (props.links && props.links.length > 0) {
    const length = props.links.length;
    let index = props.links.findIndex((id) => id === props.id);
    config = `${++index}/${length}`;

    if (props.installment != 1) {
      title = `${index}. of ${length} installments with total value ${
        +props.amount * length
      }`;
    } else if (props.repeat != 0) {
      title = `${index}. of ${length} repeated items`;
    }
  }

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
      <div title={title}>{config}</div>
      <div>{props.amount}</div>
    </div>
  );
}

export default RecordItem;
