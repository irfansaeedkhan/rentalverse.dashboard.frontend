"use client";

import MinerChartBox from "@/components/rental-miners/miner-chart-box";

const RentalCharts = () => {
  return (
    <section className="relative flex w-full flex-col gap-4 overflow-hidden">
      <div className="rounded-xl bg-primary-dark p-6 text-white">
        <p className="text-sm text-white/60">Operations</p>
        <h1 className="mt-1 text-2xl font-semibold">Rental Miners</h1>
        <p className="mt-2 text-sm text-white/70">
          Demo miner metrics are loaded from the local mock API.
        </p>
      </div>
      <div className="miner-box relative z-0 mx-auto min-h-dvh w-full pb-10">
        <MinerChartBox
          bucketId="Miner_153F407D"
          minerName="153F407D"
          officeSize="Large Offices"
        />
      </div>
    </section>
  );
};

export default RentalCharts;
