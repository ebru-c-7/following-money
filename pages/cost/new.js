import { getSession } from "next-auth/client";

import { COST_FORM, COST_FORM_ADDED } from "../../components/cost/data";

import Form from "../../components/shared/form/form";

function NewCostEntryPage(props) {
  return (
    <Form data={COST_FORM} addedData={COST_FORM_ADDED}>
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
