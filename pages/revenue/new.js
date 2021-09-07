import { getSession } from "next-auth/client";

import {
  REVENUE_FORM,
  REVENUE_FORM_ADDED,
} from "../../components/revenue/data";

import Form from "../../components/shared/form/form";

function NewRevenueEntryPage(props) {
  return (
    <Form data={REVENUE_FORM} addedData={REVENUE_FORM_ADDED}>
      New Revenue
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
