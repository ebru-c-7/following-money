import axios from "axios";
import { useSelector } from "react-redux";

import { DARK_MODE } from "../../../store/reducers";
import IconDelete from "../UI/icon-delete";
import IconEdit from "../UI/icon-edit";
import ToolTip from "../UI/tool-tip";
import Icon from "./Icon";

import classes from "./record.module.css";

function RecordItem(props) {
  const mode = useSelector((state) => state.mode.mode);

  const deleteHandler = async (type, id, links) => {
    const response = await axios.delete(`/api/${type}`, { data: { id } });
    console.log(response.data);
    if (links && links.length > 0) {
      props.removeItems(links);
    } else props.removeItems([id]);
  };

  const editHandler = async (type, id, data) => {
    const response = await axios.patch(`/api/${type}/${id}`, { data });
    console.log(response.data);
  };

  let config = null;
  let title = "";
  if (props.links && props.links.length > 0) {
    const length = props.links.length;
    let index = props.links.findIndex((id) => id === props.id);
    config = `${++index}/${length}`;

    if (props.installment != 1) {
      title = `${index}. of ${length} installments <br/>with total value ${
        +props.amount * length
      }`;
    } else if (props.repeat != 0) {
      title = `${index}. of ${length} <br/>repeated items`;
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
        <div data-tip={title}>
          {config}
          {title && <ToolTip type={mode === DARK_MODE ? "warning" : "error"} />}
        </div>
        <div>{props.amount.toFixed(2)}</div>
        <div className={classes.Action}>
          <IconEdit
            title={"Edit"}
            color={mode === DARK_MODE ? "#f5f6f7" : "#1b1b32"}
            onClick={() => console.log("open modal")}
          />
          <IconDelete
            title="Delete"
            color={mode === DARK_MODE ? "#f5f6f7" : "#1b1b32"}
            onClick={deleteHandler.bind(
              this,
              props.listType,
              props.id,
              props.links
            )}
          />
          <ToolTip noicon type={mode === DARK_MODE ? "warning" : "error"} />
        </div>
      </div>
    </div>
  );
}

export default RecordItem;
