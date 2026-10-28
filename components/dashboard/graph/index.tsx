"use client";

import React, { useEffect, useState, useCallback } from "react";
import { DropdownOption, YearDropdown } from "../year-drop-down";
import { TransactionChart } from "../transaction-chart";
import { TransactionChartMobile } from "../transaction-chart-mobile";
import {
  GetGraphDetailsResponse,
  getGraphDetails,
} from "@/lib/auth/get-graph-details";

const DUMMY_GRAPH_DATA: GetGraphDetailsResponse = {
  percentages: [
    { January: 0 },
    { February: 0 },
    { March: 0 },
    { April: 0 },
    { May: 0 },
    { June: 0 },
    { July: 0 },
    { August: 0 },
    { September: 0 },
    { October: 0 },
    { November: 0 },
    { December: 0 },
  ],
  year: "2024",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Never plot future months: for the current year only months up to today
// are shown; a future year shows no bars at all.
const visibleMonthsForYear = (year: string) => {
  const now = new Date();
  const yearNumber = Number(year);
  if (!Number.isFinite(yearNumber)) return MONTH_NAMES;
  if (yearNumber > now.getFullYear()) return [];
  if (yearNumber < now.getFullYear()) return MONTH_NAMES;
  return MONTH_NAMES.slice(0, now.getMonth() + 1);
};

const RevenueGraph: React.FC = () => {
  const [finalGraphData, setFinalGraphData] =
    useState<GetGraphDetailsResponse>(DUMMY_GRAPH_DATA);
  const [dataYears, setDataYears] = useState<DropdownOption[]>([]);
  // Start on the current year so the selector shows a real year on first
  // paint; the fetch below corrects it to the latest year with data.
  const [selectedYear, setSelectedYear] = useState<string>(() =>
    String(new Date().getFullYear()),
  );

  // Function to fetch graph data
  const fetchGraphData = useCallback(async () => {
    try {
      const res = await getGraphDetails(); // Fetch graph details
      const years = res?.map((item) => item.year);

      if (years) {
        const uniqueYears = Array.from(new Set(years)).sort();
        const dropdownOptions = uniqueYears.map((year) => ({
          value: year,
          label: year,
        }));
        setDataYears(dropdownOptions);

        // Default to the latest year with data, never the placeholder:
        // the selector must always show a real year.
        const effectiveYear =
          selectedYear && uniqueYears.includes(selectedYear)
            ? selectedYear
            : uniqueYears[uniqueYears.length - 1];
        if (effectiveYear !== selectedYear) {
          setSelectedYear(effectiveYear);
        }
        const initialGraphData =
          res.find((item) => item.year === effectiveYear) || res[0];
        const visibleMonths = visibleMonthsForYear(effectiveYear);
        setFinalGraphData({
          ...initialGraphData,
          percentages: initialGraphData.percentages.filter((entry) =>
            visibleMonths.includes(Object.keys(entry)[0]),
          ),
        });
      } else {
        setDataYears([{ value: "2024", label: "2024" }]);
        setFinalGraphData(DUMMY_GRAPH_DATA);
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  }, [selectedYear]);

  // Fetch graph data when component mounts or year changes
  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  // Handle dropdown year change
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="rounded-xl bg-primary-dark">
      <div className="flex w-full items-center justify-between gap-4 rounded-tl-xl rounded-tr-xl bg-primary-light px-4 pb-4 pt-4 sm:px-6 sm:py-6 sm:pb-8 md:bg-primary-dark">
        <div className="hidden flex-col gap-1 sm:flex">
          <p className="text-xl font-bold text-white">Monthly Return</p>
          <p className="text-xs font-medium text-white">
            Monthly return, in percent
          </p>
        </div>
        <h3 className="block text-lg font-bold text-white sm:hidden">
          Monthly Return
        </h3>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={handleYearChange}
        />
      </div>
      <div className="hidden w-full sm:px-6 sm:py-6 md:block">
        <TransactionChart graphData={finalGraphData.percentages} />
      </div>
      <div className="block w-full sm:px-6 sm:py-6 md:hidden">
        <TransactionChartMobile graphData={finalGraphData.percentages} />
      </div>
    </div>
  );
};

export default RevenueGraph;
