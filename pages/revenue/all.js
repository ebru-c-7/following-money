import { getSession } from "next-auth/client";
import { getAllRevenues } from "../api/revenue";

import RecordList from "../../components/shared/record/record-list";

function RevenueListPage(props) {
  return <RecordList data={props.data} />;
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
