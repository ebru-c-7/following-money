import RecordItem from "./record-item";

function RecordList(props) {
  if (props.data.length !== 0) {
    const items = props.data.map((item) => (
      <RecordItem listType={props.type} key={item.id} {...item} />
    ));
    return (
      <div>
        <h1>{props.title}</h1>
        {items}
      </div>
    );
  }

  return <p>No item is found!</p>;
}

export default RecordList;
