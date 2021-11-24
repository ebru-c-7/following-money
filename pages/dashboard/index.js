import { getSession } from "next-auth/client";
import LineComponent from "../../components/dashboard/line-component";
import PieComponent from "../../components/dashboard/pie-component";
import Header from "../../components/shared/list/header";

function DashboardPage(props) {
  return (
    <div>
      <Header>Dashboard</Header>
      <LineComponent>Expense vs Revenue</LineComponent>
      <PieComponent delay={1000}>Revenue Sources</PieComponent>
      <PieComponent delay={2000}>Expsense Sources</PieComponent>
    </div>
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

export default DashboardPage;
