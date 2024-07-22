import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RenderDonutChart = ({ categories, series, valueLabels }) => {
  const options = {
    chart: {
      type: "pie",
      height: "280px",
    },
    title: {
      text: null, // This removes the chart title
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        dataLabels: {
          enabled: true,
          formatter: function () {
            // Use `this.percentage` to get the percentage value
            return `${Highcharts.numberFormat(this.percentage, 0)}%`;
          },
          connectorWidth: 0, // Set connector line width to 0 to hide it
          connectorPadding: 0, // Set padding to 0 to remove extra space
          distance: -30,
        },
        showInLegend: true,
      },
    },
    legend: {
      align: "right", // Aligns the legend to the right
      verticalAlign: "middle", // Vertically centers the legend
      layout: "vertical", // Stacks the legend items vertically
      itemMarginTop: 10, // Adds margin between legend items
      itemMarginBottom: 10, // Adds margin between legend items
    },
    series: [
      {
        name: valueLabels,
        data: categories?.map((each, index) => {
          return [each, series[0]?.data[index]];
        }),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RenderDonutChart;
