import { getSession } from "next-auth/client";

function DashboardPage(props) {
  return <div>Dashboard</div>;
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

export default DashboardPage;
