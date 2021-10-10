import axios from "axios";
import { getSession } from "next-auth/client";

import {
  REVENUE_FORM,
  REVENUE_FORM_ADDED,
} from "../../components/revenue/data";

import Form from "../../components/shared/form/form";
import Header from "../../components/shared/list/header";

function NewRevenueEntryPage(props) {
  const submitHandler = async (data) => {
    console.log(data);
    const response = await axios.post("/api/revenue/", data);
    console.log(response);
  };

  return (
    <Form
      data={REVENUE_FORM}
      addedData={REVENUE_FORM_ADDED}
      submitHandler={submitHandler}
    >
      <Header>New Revenue</Header>
    </Form>
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

  return {
    props: {
      session,
      user: session.user,
    },
  };
}

export default NewRevenueEntryPage;
