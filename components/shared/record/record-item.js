import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import { DARK_MODE } from "../../../store/reducers";
import { renderCostForm, renderCostOptions } from "../../cost/data";
import { renderRevenueForm, renderRevenueOptions } from "../../revenue/data";
import Form from "../form/form";
import Header from "../list/header";
import IconDelete from "../UI/icon-delete";
import IconEdit from "../UI/icon-edit";
import Modal from "../UI/modal";
import ToolTip from "../UI/tool-tip";
import Icon from "./Icon";

import classes from "./record.module.css";

function RecordItem(props) {
  const mode = useSelector((state) => state.mode.mode);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = async (type, id, links) => {
    const response = await axios.delete(`/api/${type}`, { data: { id } });
    console.log(response.data);
    if (links && links.length > 0) {
      props.removeItems(links);
    } else props.removeItems([id]);
  };

  const editHandler = () => {
    setShowModal(true);
  };

  const editSubmitHandler = async (data) => {
    const oldData = {
      ...props,
      date: props.date.includes("T")
        ? props.date.split("T")[0].replace('"', "").toString()
        : props.date,
      amount:
        props.installment > 1
          ? +props.amount * +props.installment
          : +props.amount,
    };
    data.amount = +data.amount;
    const updatedData = {};
    for (let el in data) {
      if (data[el] == oldData[el]) continue;
      else {
        updatedData[el] = data[el];
      }
    }

    console.log(updatedData);
    const dataWId = { data: updatedData, id: props.id };

    const response = await axios.patch(`/api/${props.listType}/`, dataWId);
    console.log(response.data);
    if (response.data.success) {
      setShowModal(false);
      props.editItemHandler(response.data.data);
    }
  };

  let config = null;
  let title,
    note = "";
  if (props.links && props.links.length > 0) {
    const length = props.links.length;
    let index = props.links.findIndex((id) => id === props.id);
    config = `${++index}/${length}`;

    if (props.installment != 1) {
      title = `${index}. of ${length} installments <br/>with total value ${
        +props.amount * length
      }`;
      note = `More Info: ${index}. of ${length} installments with total value ${
        +props.amount * length
      }`;
    } else if (props.repeat != 0) {
      title = `${index}. of ${length} <br/>repeated items`;
      note = `More Info: ${index}. of ${length} repeated items`;
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
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Form
            data={
              props.listType === "cost"
                ? renderCostForm(props)
                : renderRevenueForm(props)
            }
            addedData={
              []
              // props.listType === "cost"
              //   ? renderCostOptions(props)
              //   : renderRevenueOptions(props)
            }
            submitHandler={editSubmitHandler}
            buttonText={"Submit Changes"}
          >
            <Header>
              {props.listType === "cost" ? "Edit Cost" : "Edit Revenue"}
            </Header>
          </Form>
          <div className={classes.NoteText}>{note}</div>
        </Modal>
      )}
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
            {title && (
              <ToolTip
                short={props.installment != 1 ? "I" : "R"}
                type={mode === DARK_MODE ? "warning" : "error"}
              />
            )}
          </div>
          <div>{props.amount.toFixed(2)}</div>
          <div className={classes.Action}>
            <IconEdit
              title={"Edit"}
              color={mode === DARK_MODE ? "#f5f6f7" : "#1b1b32"}
              onClick={editHandler}
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
    </>
  );
}

export default RecordItem;
