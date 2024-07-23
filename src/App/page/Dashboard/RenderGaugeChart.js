// SimpleGaugeChart.js
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

// Initialize the modules
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const RenderGaugeChart = ({ count, valueLabel, plotBandData, height }) => {
  function abbreviateNumber(value) {
    if (value >= 1.0e9) {
      return (value / 1.0e9).toFixed(1) + "B";
    } else if (value >= 1.0e6) {
      return (value / 1.0e6).toFixed(1) + "M";
    } else {
      return value;
    }
  }
  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      ...(height ? { height: height } : {}),
    },

    title: {
      text: null,
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "120%",
    },

    // the value axis
    yAxis: {
      min: 0,
      max:
        count > plotBandData.threshold2
          ? Math.round(count * (125 / 100))
          : Math.round(plotBandData.threshold2 * (125 / 100)),
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: plotBandData?.threshold1,
          color: "#C84435", // green
          thickness: 10,
          borderRadius: "50%",
        },
        {
          from: plotBandData?.threshold1,
          to: plotBandData?.threshold2,
          color: "#F6BC61", // yellow

          thickness: 10,
          borderRadius: "50%",
        },
        {
          from: plotBandData?.threshold2,
          to:
            count > plotBandData.threshold2
              ? Math.round(count * (125 / 100))
              : Math.round(plotBandData.threshold2 * (125 / 100)),
          color: "#2C6E6C", // red
          thickness: 10,
        },
      ],
    },

    series: [
      {
        name: valueLabel,
        data: [abbreviateNumber(count)],
        dataLabels: {
          format: "{y}",
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "18px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RenderGaugeChart;
