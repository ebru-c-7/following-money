import RecordItem from "./record-item";

function RecordList(props) {
  if (props.data.length !== 0) {
    const items = props.data.map((item) => (
      <RecordItem key={item.id} {...item} />
    ));
    return items;
  }

  return <p>No item is found!</p>;
}

export default RecordList;
