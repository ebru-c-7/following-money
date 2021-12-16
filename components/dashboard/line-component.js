import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MONTHS } from "../../util/lib";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";

var darkFont = "#1b1b32";
var lightFont = "#ffffff";

const GraphComponent = (props) => {
  const mode = useSelector((state) => state.mode.mode);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          color: mode === DARK_MODE ? lightFont : darkFont,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: props.children,
        color: mode === DARK_MODE ? lightFont : darkFont,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          borderColor: mode === DARK_MODE ? lightFont : darkFont,
          color: "#5a646e",
          tickColor: "#5a646e",
        },
        ticks: {
          color: mode === DARK_MODE ? lightFont : darkFont,
        },
      },
      y: {
        min: 0,
        ticks: {
          color: mode === DARK_MODE ? lightFont : darkFont,
          precision: 0,
        },
        grid: {
          borderColor: mode === DARK_MODE ? lightFont : darkFont,
          color: "#5a646e",
          tickColor: "#5a646e",
        },
      },
    },
  };

  const labels = MONTHS;
  console.log(props);
  const expenseLine = new Array(12).fill(0);
  const revenueLine = new Array(12).fill(0);
  const year = props.activeYear;

  if (props.expenseData[year]) {
    props.expenseData[year].forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      expenseLine[month] += expense.amount;
    });
  }

  if (props.revenueData[year]) {
    props.revenueData[year].forEach((rev) => {
      const month = new Date(rev.date).getMonth();
      revenueLine[month] += rev.amount;
    });
  }

  console.log(expenseLine, revenueLine);

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: expenseLine,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Revenue",
        data: revenueLine,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default GraphComponent;
