import { useSelector } from "react-redux";
import { DARK_MODE } from "../../../store/reducers";
import Icon from "./Icon";

import classes from "./record.module.css";

function RecordItem(props) {
  const mode = useSelector((state) => state.mode.mode);

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

  const itemClass = [
    classes.Item,
    props.listType === "cost" ? classes.Cost : classes.Revenue,
    mode === DARK_MODE ? classes.Dark : classes.Light,
  ].join(" ");

  return (
    <div className={itemClass} title={props.note}>
      <div className={classes.Date}>
        <p className={classes.Year}>{year}</p>
        <div
          className={classes.DateBox}
          title={`${day} ${month} ${weekday}, ${year} `}
        >
          <Icon className={classes.Icon} mode={mode} />
          <p className={classes.Month}>{month}</p>
          <p className={classes.Day}>{day}</p>
        </div>
      </div>
      <div className={classes.Content}>
        <div className={classes.Text}>{`${props.source || props.type} - ${
          props.name
        }`}</div>
        <div title={title}>{config}</div>
        <div>{props.amount}</div>
      </div>
    </div>
  );
}

export default RecordItem;
