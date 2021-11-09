import { getSession } from "next-auth/client";
import { getAllRevenues } from "../api/revenue";

import RecordList from "../../components/shared/record/record-list";
import { useState } from "react";

function RevenueListPage(props) {
  const [data, setData] = useState(props.data);

  const removeItemsHandler = (idArray) => {
    const newData = data.filter((item) => !idArray.includes(item.id));
    setData(newData);
  };

  return (
    <RecordList
      type="revenue"
      title={"Revenue List"}
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

  const result = await getAllRevenues(session.user.id);

  return {
    props: {
      session,
      user: session.user,
      data: result,
    },
  };
}

export default RevenueListPage;
