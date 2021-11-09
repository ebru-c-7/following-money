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

  return (
    <RecordList
      type="cost"
      title={"Cost List"}
      data={data}
      removeItems={removeItemsHandler}
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
