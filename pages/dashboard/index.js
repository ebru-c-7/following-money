import { getSession } from "next-auth/client";
import { useState } from "react";
import LineComponent from "../../components/dashboard/line-component";
import PieComponent from "../../components/dashboard/pie-component";
import Header from "../../components/shared/list/header";
import { EXPENSE_TYPES, REVENUE_SOURCES, YEARS } from "../../util/lib";
import { getAllCosts } from "../api/cost";
import { getAllRevenues } from "../api/revenue";

import classes from "../../components/shared/layout.module.css";

function DashboardPage(props) {
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [expenseData, setExpenseData] = useState(props.expenseData);
  const [revenueData, setRevenueData] = useState(props.revenueData);

  const selectItem = (
    <select
      className={classes.Select}
      defaultValue={activeYear}
      onChange={(e) => setActiveYear(e.target.value)}
    >
      {YEARS().map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <Header>Dashboard for {selectItem}</Header>

      <LineComponent
        activeYear={activeYear}
        expenseData={expenseData}
        revenueData={revenueData}
      >
        Expense vs Revenue
      </LineComponent>
      <PieComponent
        delay={1000}
        activeYear={activeYear}
        labels={REVENUE_SOURCES}
        data={revenueData}
      >
        Revenue Sources
      </PieComponent>
      <PieComponent
        delay={2000}
        activeYear={activeYear}
        labels={EXPENSE_TYPES}
        data={expenseData}
      >
        Expense Sources
      </PieComponent>
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

  const expenseAllData = await getAllCosts(session.user.id);
  const revenueAllData = await getAllRevenues(session.user.id);
  const expenseDataByYear = {};
  const revenueDataByYear = {};

  expenseAllData.map(({ id, date, type, amount }) => {
    const year = new Date(JSON.parse(date)).getFullYear();
    const item = {
      id,
      date: JSON.parse(date),
      type,
      amount,
    };

    if (expenseDataByYear[year]) {
      expenseDataByYear[year].push(item);
    } else {
      expenseDataByYear[year] = [item];
    }
  });

  revenueAllData.map(({ id, date, source, amount }) => {
    const year = new Date(JSON.parse(date)).getFullYear();

    const item = {
      id,
      date: JSON.parse(date),
      type: source,
      amount,
    };

    if (revenueDataByYear[year]) {
      revenueDataByYear[year].push(item);
    } else {
      revenueDataByYear[year] = [item];
    }
  });

  return {
    props: {
      session,
      user: session.user,
      expenseData: expenseDataByYear,
      revenueData: revenueDataByYear,
    },
  };
}

export default DashboardPage;
