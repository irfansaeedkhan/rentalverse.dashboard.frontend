"use client";
import React from "react";
import { InvoiceTable } from "@/components/profile";
import { InvoiceTableMobile } from "@/components/dashboard/invoice-table-mobile";
import { ExclaimationIcon } from "@/assets/svgs";

const MyInvoice = () => {
  return (
    <div className="">
      <div className="bg-primary-dark mb-6 flex w-full items-center gap-2  rounded-xl p-3 md:mb-8">
        <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
        <div className="flex flex-col gap-1">
          <h3 className="text-yellow pt-1 font-kanit text-xs md:text-sm">
            Invoices complaint with BIA and FSA regulators
          </h3>
        </div>
      </div>
      <div className="bg-primary-dark flex w-full flex-col rounded-xl">
        <InvoiceTable />
        <InvoiceTableMobile />
      </div>
    </div>
  );
};

export default MyInvoice;
