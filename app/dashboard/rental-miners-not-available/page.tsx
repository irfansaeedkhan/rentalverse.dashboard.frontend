"use client";

import { useRouter } from "next/navigation";
import MinerChartBox from "@/components/rental-miners/miner-chart-box";

const RentalCharts = () => {
  const router = useRouter();
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-blue-dark">
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-primary/30 backdrop-blur-lg">
        <h3 className="text-center text-2xl font-semibold text-white">
          Coming Soon
        </h3>
      </div>
      <div className="miner-box relative z-0 mx-auto min-h-dvh w-full pb-10">
        <MinerChartBox
          bucketId="Miner_153F407D"
          minerName="153F407D"
          officeSize="Large Offices"
        />
        {/* <MinerChartBox
          bucketId="Miner_4ECC464A"
          minerName="4ECC464A"
          officeSize="Medium Offices"
        />
        <MinerChartBox
          bucketId="Miner_BF2E6D23"
          minerName="BF2E6D23"
          officeSize="Small Offices"
        /> */}
      </div>
    </section>
  );
};

export default RentalCharts;
