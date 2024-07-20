import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RenderChart = ({ categories, series, stacked, valueLabel, type }) => {
  const options = {
    chart: {
      type: type,
      height: "350px",
    },
    xAxis: {
      categories: categories,
    },
    title: {
      text: null, // This removes the chart title
    },
    yAxis: {
      title: {
        text: valueLabel,
      },
    },
    legend: {
      enabled: series?.length > 1, // This hides the legend
    },
    series: series,
    plotOptions: {
      column: {
        pointPadding: 0.1, // Controls the padding between each point/bar
        groupPadding: 0.1, // Controls the padding between each group of bars
        borderWidth: 0,
        ...(stacked ? { stacking: "normal" } : {}),
      },
      bar: {
        pointPadding: 0.1, // Controls the padding between each point/bar
        groupPadding: 0.1, // Controls the padding between each group of bars
        borderWidth: 0,
        ...(stacked ? { stacking: "normal" } : {}),
      },
    },
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RenderChart;
