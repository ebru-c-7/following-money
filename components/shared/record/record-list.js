import Header from "../list/header";
import RecordItem from "./record-item";

import classes from "./record.module.css";

function RecordList(props) {
  if (props.data.length !== 0) {
    const items = props.data.map((item) => (
      <RecordItem
        listType={props.type}
        key={item.id}
        {...item}
        removeItems={props.removeItems}
        editItemHandler={props.editItemHandler}
      />
    ));

    return (
      <div style={{ overflowX: "auto" }}>
        <Header>{props.title}</Header>
        <div className={classes.ItemContainer}>{items}</div>
      </div>
    );
  }

  return <p>No item is found!</p>;
}

export default RecordList;
