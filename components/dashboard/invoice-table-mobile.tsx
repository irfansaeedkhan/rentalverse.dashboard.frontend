"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";
import { InvoicesType, getInvoicesList } from "@/lib/auth/get-invoices";
import { ExclaimationIcon, USDTIcon } from "@/assets/svgs";
import { YearDropdown } from "./year-drop-down";
import generateInvoicePDF from "../profile/generate-invoice-pdf";
import { RiDownload2Fill } from "react-icons/ri";
import TotalNumberField from "../shared/total-number-field";
import toast from "react-hot-toast";
import { DEMO_PAGE_SIZE } from "@/lib/demo-api";

export const InvoiceTableMobile: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [invoicesData, setInvoicesData] = useState<InvoicesType[]>();

  const getInvoicesDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInvoicesList();
      const list = Array.isArray(res) ? res : [];
      setInvoicesData(list);
      setTotalPages(Math.max(1, Math.ceil(list.length / DEMO_PAGE_SIZE)));
      setPage(1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const dataYears = [
    { value: "all", label: "All" },
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setPage(1);
  };

  useEffect(() => {
    getInvoicesDetails();
  }, [getInvoicesDetails]);

  const filteredTransactions = useMemo(() => {
    if (!invoicesData) return invoicesData;
    return invoicesData.filter((transaction) => {
      if (selectedYear === "all") return true;
      return transaction.date?.startsWith(selectedYear);
    });
  }, [invoicesData, selectedYear]);

  const pagedTransactions = useMemo(() => {
    if (!filteredTransactions) return filteredTransactions;
    const pages = Math.max(
      1,
      Math.ceil(filteredTransactions.length / DEMO_PAGE_SIZE),
    );
    const safePage = Math.min(page, pages);
    const start = (safePage - 1) * DEMO_PAGE_SIZE;
    return filteredTransactions.slice(start, start + DEMO_PAGE_SIZE);
  }, [filteredTransactions, page]);

  useEffect(() => {
    if (!filteredTransactions) return;
    setTotalPages(
      Math.max(1, Math.ceil(filteredTransactions.length / DEMO_PAGE_SIZE)),
    );
  }, [filteredTransactions]);

  const handleDownloadPDF = (invoice: InvoicesType) => {
    try {
      generateInvoicePDF([
        { field: "Invoice ID", value: invoice.id },
        { field: "Date", value: invoice.date },
        { field: "Duration (weeks)", value: invoice.duration },
        { field: "Quantity", value: invoice.quantity },
        { field: "Unit price (USDT)", value: invoice.meta_asset_price },
        {
          field: "Total (USDT)",
          value: invoice.meta_asset_price * invoice.quantity,
        },
      ]);
      toast.success("Invoice downloaded");
    } catch (error) {
      console.error("Error downloading the PDF:", error);
      toast.error("Failed to download invoice");
    }
  };

  return (
    <div className=" flex w-full flex-col rounded-xl text-white md:hidden">
      <div className="flex h-16 items-center justify-between gap-5 rounded-t-xl bg-primary-light px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium leading-7">Transactions</span>
          {filteredTransactions && (
            <TotalNumberField
              bgColor="bg-primary-light"
              length={filteredTransactions.length}
            />
          )}
        </div>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={(year) => handleYearChange(year)}
        />
      </div>
      <div className="flex flex-col bg-primary">
        {pagedTransactions && pagedTransactions.length > 0 ? (
          pagedTransactions.map((invoice, index) => (
            <div
              key={invoice.id ?? index}
              className="flex w-full flex-col gap-3 border-b border-primary-light bg-primary-dark p-6 last:rounded-b-xl last:border-none"
            >
              <div className={mainDiv}>
                <h6 className={h6}>Duration</h6>
                <p className={p}> {invoice?.duration ?? "N/A"} weeks</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Qty </h6>
                <p className={p}> {invoice?.quantity ?? "N/A"}</p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>SinglePackCost </h6>
                <p className={p}>
                  <USDTIcon className="size-5 shrink-0" />
                  {invoice?.meta_asset_price ?? "N/A"} USDT
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Date</h6>
                <p className={p}>
                  {invoice?.date
                    ? dayjs(invoice?.date).format("DD MMM YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>TotalAmount </h6>
                <p className={p}>
                  <USDTIcon className="size-5 shrink-0" />
                  <span>
                    {invoice?.meta_asset_price != null &&
                    invoice?.quantity != null
                      ? invoice.meta_asset_price * invoice.quantity
                      : "N/A"}{" "}
                    USDT
                  </span>
                </p>
              </div>

              <div className={mainDiv}>
                <h6 className={h6}>Download Invoice</h6>
                <button onClick={() => handleDownloadPDF(invoice)}>
                  <RiDownload2Fill className="size-5 text-white" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-4 py-10">
            <ExclaimationIcon className="mx-auto size-8 shrink-0 cursor-pointer [&>path]:fill-white" />
            <h3 className="text-center text-sm text-white">
              There is no invoices.
            </h3>
          </div>
        )}
      </div>
      <div className="mx-auto flex w-full max-w-[90%] items-center justify-center gap-4 py-4">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1 || totalPages <= 1}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] px-4 py-2 text-sm disabled:opacity-50"
        >
          <HiMiniArrowLeft /> Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages || totalPages <= 1}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] px-4 py-2 text-sm disabled:opacity-50"
        >
          Next <HiMiniArrowRight />
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin" />
        </div>
      )}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm  leading-[18px]";
const p = "text-sm leading-5 flex items-center gap-1";
