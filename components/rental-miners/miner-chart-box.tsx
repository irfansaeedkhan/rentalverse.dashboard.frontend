"use client";

import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

import PerSecondTransactionChart from "@/components/rental-miners/Last-24h-rented-hours-per-second";
import Last24HoursRentedChart from "@/components/rental-miners/Last-24h-rented-revenue";

import SolidGaugeChart from "./solid-gauge-chart";
import RentalStatsCards from "./rental-stats-cards";
import HoursRentedLastWeekChart from "./last-week-hours-rented-chart";
import Last24hRentedHoursperSecond from "@/components/rental-miners/Last-24h-rented-hours-per-second";
import Last24HoursRentedRevenue from "@/components/rental-miners/Last-24h-rented-revenue";
import LastWeekHoursRentedChart from "./last-week-hours-rented-chart";
import GradientGaugeChart from "./extras/gauge";

export interface MinerData {
  ts: number;
  val: {
    "A-timeStamp": number;
    "B-date": string;
    "C-time": string;
    "D-minerId": string;
    "E-actDateTime": string;
    "F-buyerId": string;
    "G-buyerPW": string;
    "H-sellerId": string;
    "I-officeType": string;
    "L-trxNumber": number;
    "M-dayTransNumber": number;
    "N-hourTransNumber": number;
    "O-trxToken": string;
    "P-totalSale": number;
    "Q-revIncome": number;
    "R-daySale": number;
    "S-dayRevIncome": number;
    "T-hourSale": number;
    "U-hourRevIncome": number;
    "V-trxSec": number;
    "Z-mAh": number;
  };
}

interface Props {
  // data: MinerData[];
  bucketId: string;
  minerName: string;
  officeSize: string;
}
const MinerChartBox: React.FC<Props> = ({
  bucketId,
  minerName,
  officeSize,
}) => {
  const [data, setData] = useState<MinerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshRate, setRefreshRate] = useState(60);

  useEffect(() => {
    const fetchData = async (showSpinner: boolean) => {
      if (showSpinner) setLoading(true);

      try {
        const response = await fetch(`/api/demo/rental-miners/${bucketId}/data`);
        const result = await response.json();
        setData(result);
      } catch (e) {
        setData([]);
      } finally {
        if (showSpinner) setLoading(false);
      }
    };

    fetchData(true);

    const interval = setInterval(() => {
      fetchData(false);
    }, refreshRate * 1000);
    return () => clearInterval(interval);
  }, [bucketId, refreshRate]);

  return (
    <div className="relative mx-auto min-h-dvh w-full pt-10">
      <div className="miner-box__inner z-10 flex w-full flex-col gap-6">
        <div className="flex flex-col">
          <h2 className="text-sm font-normal text-white md:text-xl">
            Rental Miner<span className="text-green"> {minerName}</span>
          </h2>
          <h6 className="text-sm font-normal text-white">{officeSize}</h6>
        </div>
        <div className="flex w-full flex-col gap-6 overflow-hidden tablet:h-[455px] tablet:flex-row">
          <div className="flex w-full flex-col items-center justify-between gap-6 tablet:w-2/5">
            <GradientGaugeChart
              value={data?.[0]?.val["V-trxSec"] || 0}
              maxValue={5}
              minValue={0}
              colorStart="#00A3FF"
              colorEnd="#00FF94"
              mainTitle="Average Rented Hours per Second"
              timeIndicator="60s"
              label="Hour Rented / Sec"
              color="#00A3FF"
            />
            <GradientGaugeChart
              colorStart="#00FF94"
              colorEnd="#00A3FF"
              value={data?.[0]?.val["Z-mAh"] || 0}
              maxValue={750}
              minValue={0}
              label="mW/h"
              color="#00FF94"
              mainTitle="Green FootPrint - mW/h"
              timeIndicator="60s"
              greenFootPrint={true}
            />
          </div>

          <div className="relative z-10 w-full overflow-hidden rounded-lg bg-blue-light tablet:w-3/5">
            {/* <Last24hRentedHoursperSecond data={data} /> */}
            <Last24hRentedHoursperSecond />
          </div>
        </div>
        <div className="flex w-full flex-row gap-6">
          <RentalStatsCards
            totalRentedHours={new Intl.NumberFormat().format(
              data?.[0]?.val["L-trxNumber"] || 0,
            )}
            todayRentedHours={new Intl.NumberFormat().format(
              data?.[0]?.val["M-dayTransNumber"] || 0,
            )}
            totalSales={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(data?.[0]?.val["P-totalSale"] || 0)}
            todaySales={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(data?.[0]?.val["R-daySale"] || 0)}
            totalRevenues={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(data?.[0]?.val["Q-revIncome"] || 0)}
            todayRevenues={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(data?.[0]?.val["S-dayRevIncome"] || 0)}
            refreshRate={refreshRate}
          />
        </div>
        <div className="flex w-full flex-col gap-6 tablet:flex-row">
          <div className="relative z-10 w-full rounded-lg bg-primary-light">
            <Last24HoursRentedRevenue data={data} />
          </div>
          <div className="relative z-10 w-full rounded-lg bg-primary-light">
            <LastWeekHoursRentedChart data={data} />
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default MinerChartBox;
