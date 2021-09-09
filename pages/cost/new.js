import axios from "axios";
import { getSession } from "next-auth/client";

import { COST_FORM, COST_FORM_ADDED } from "../../components/cost/data";

import Form from "../../components/shared/form/form";

function NewCostEntryPage(props) {
  const submitHandler = async (data) => {
    const response = await axios.post("/api/cost/", data);
    console.log(response.data);
  };

  return (
    <Form
      data={COST_FORM}
      addedData={COST_FORM_ADDED}
      submitHandler={submitHandler}
    >
      New Cost
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

export default NewCostEntryPage;
