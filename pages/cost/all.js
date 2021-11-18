import { useState } from "react";
import { getSession } from "next-auth/client";
import { getAllCosts } from "../api/cost";

import RecordList from "../../components/shared/record/record-list";

function CostListPage(props) {
  const [data, setData] = useState(props.data);
  const removeItemsHandler = (idArray) => {
    const newData = data.filter((item) => !idArray.includes(item.id));
    setData(newData);
  };

  const editItemHandler = (updatedObjArr) => {
    const idArr = updatedObjArr.map((item) => item._id);
    const newData = data
      .map((item) => {
        if (idArr.includes(item.id)) {
          let newEl = updatedObjArr.find((el) => el._id === item.id);
          newEl.id = item.id;
          return newEl;
        } else return item;
      })
      .sort(
        (a, b) =>
          new Date(a.date.split("T")[0]) - new Date(b.date.split("T")[0])
      );
    setData(newData);
  };

  return (
    <RecordList
      type="cost"
      title={"Cost List"}
      data={data}
      removeItems={removeItemsHandler}
      editItemHandler={editItemHandler}
    />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const result = await getAllCosts(session.user.id);

  return {
    props: {
      session,
      user: session.user,
      data: result,
    },
  };
}

export default CostListPage;
