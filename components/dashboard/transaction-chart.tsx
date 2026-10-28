"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Percentage } from "@/lib/auth/get-graph-details";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  graphData: Percentage[];
}

type Series = {
  name: string;
  data: number[];
};

export const TransactionChart: React.FC<Props> = ({ graphData }) => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState<Series[]>([]);

  const updateChartData = useCallback(() => {
    const dataPoints = graphData.map((data) => Object.values(data)[0]);
    setSeries([
      {
        name: "Monthly return",
        data: dataPoints,
      },
    ]);

    setOptionsData({
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "8px",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: graphData.map((data) => Object.keys(data)[0]),
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "0.8rem",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        min: 0,
        max: 7,
        tickAmount: 7,
        labels: {
          formatter: (val) => `${Math.round(val)}%`,
          style: {
            colors: ["#ffffff"],
            fontSize: "0.7rem",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#00FF94", "#00A3FF"],
          stops: [0, 100],
        },
      },

      tooltip: {
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        x: {
          show: true,
          format: "MM",
        },
        y: {
          formatter: (val) => `${val}%`,
        },
        marker: {
          show: false,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const month = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];

          return `
            <div style="background-color: #0a2540; border: 1px solid #00C1D4; padding: 8px; border-radius: 8px; min-width: 100px;">
              <p style="color: white; font-weight: bold; margin: 0;">Monthly return</p>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
              <p style="color: #00FF94; margin: 0; padding-right: 8px;">${month}</p>
              <p style="color: #00FF94; margin: 0; padding-left: 8px;">${value}%</p>
              </div>
            </div>
          `;
        },
      },
    });
  }, [graphData]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div className="text-white">
      <ReactApexChart
        options={optionsData}
        series={series}
        type="bar"
        width="100%"
        height={350}
      />
    </div>
  );
};
