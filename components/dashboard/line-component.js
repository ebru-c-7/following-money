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

const GraphComponent = (props) => {
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
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: props.children,
        color: "white",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          borderColor: "white",
          color: "#5a646e",
          tickColor: "#5a646e",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          borderColor: "white",
          color: "#5a646e",
          tickColor: "#5a646e",
        },
      },
    },
  };

  const labels = MONTHS;

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: [10, 20, 20, 30, 50, 20, 10],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Revenue",
        data: [102, 50, 20, 40, 10, 60, 10],
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
