import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { DARK_MODE } from "../../store/reducers";

var darkFont = "#1b1b32";
var lightFont = "#ffffff";

const PieComponent = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const mode = useSelector((state) => state.mode.mode);

  var chartpluginsset = [
    // {
    //   afterDatasetDraw: (chart) => {
    //     if (
    //       chart.data.datasets[0].data.length === 0 ||
    //       chart.data.datasets[0].data.reduce((a, b) => a + b) === 0
    //     ) {
    //       console.log(chart);
    //       // No data is present
    //       var ctx = chart.ctx;
    //       var width = chart.width;
    //       var height = chart.height;
    //       chart.clear();
    //       ctx.save();
    //       ctx.textAlign = "center";
    //       ctx.textBaseline = "middle";
    //       ctx.font = 'bold 15px "Roboto Mono", monospace';
    //       ctx.fillStyle = mode === DARK_MODE ? lightFont : darkFont;
    //       // chart.options.title.text <=== gets title from chart
    //       // width / 2 <=== centers title on canvas
    //       // 18 <=== aligns text 18 pixels from top, just like Chart.js
    //       ctx.fillText(props.children, width / 2, height / 2 - 30);
    //       ctx.fillText(
    //         "No data to display for selected time period",
    //         width / 2,
    //         height / 2
    //       );
    //       ctx.restore();
    //     }
    //   },
    // },
  ];

  const options = {
    animation: {
      delay: props.delay ? props.delay : 0,
      easing: "easeInSine",
    },
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          color: mode === DARK_MODE ? lightFont : darkFont,
          font: {
            size: 14,
            family: "'Roboto Mono', monospace",
          },
        },
      },
      title: {
        display: true,
        text: props.children,
        color: mode === DARK_MODE ? lightFont : darkFont,
        font: {
          size: 20,
          family: "'Roboto Mono', monospace",
        },
      },
    },
  };

  const dataObject = props.labels.map((item) => {
    let sum = 0;
    if (props.data[props.activeYear]) {
      props.data[props.activeYear].forEach((element) => {
        if (element.type === item.value) {
          sum += element.amount;
        }
      });
    }
    return {
      value: item.value,
      text: item.text,
      sum,
    };
  });

  const data = {
    labels: props.labels.map((item) => item.text),
    datasets: [
      {
        label: "Sum by types",
        data: dataObject.map((item) => item.sum),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(131, 246, 151, 0.2)",
          "rgb(224, 124, 226, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(131, 246, 151, 1)",
          "rgb(224, 124, 226, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={options} plugins={chartpluginsset} />;
};

export default PieComponent;
