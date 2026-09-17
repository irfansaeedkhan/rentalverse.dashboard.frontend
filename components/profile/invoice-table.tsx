"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { InvoicesType, getInvoicesList } from "@/lib/auth/get-invoices";
import { TableCell, TableRow } from "../shared";
import { YearDropdown } from "../dashboard/year-drop-down";
import dayjs from "dayjs";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { ExclaimationIcon, USDTIcon } from "@/assets/svgs";
import generateInvoicePDF from "./generate-invoice-pdf";
import { RiDownload2Fill } from "react-icons/ri";
import TotalNumberField from "../shared/total-number-field";
import toast from "react-hot-toast";
import { DEMO_PAGE_SIZE } from "@/lib/demo-api";

export const InvoiceTable = () => {
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
    <div className="hidden w-full flex-col md:flex">
      <div className="flex items-center justify-between gap-5  px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-base text-white md:text-xl">Invoices</span>

          {filteredTransactions && (
            <TotalNumberField length={filteredTransactions.length} />
          )}
        </div>
        <YearDropdown
          selectedValue={selectedYear}
          options={dataYears}
          placeholder="Year"
          onSelect={(year) => handleYearChange(year)}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg text-blue-shade-1">
          <thead className="bg-primary-light">
            <TableRow
              element="th"
              className="h-11 w-full bg-primary-light px-6 py-3 text-sm text-white"
            >
              <TableCell element={"th"} className="!py-0">
                Duration
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Qty
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                SinglePackCost
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Date
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                TotalAmount
              </TableCell>
              <TableCell element={"th"} className="!py-0">
                Download Invoice
              </TableCell>
            </TableRow>
          </thead>
          <tbody>
            {pagedTransactions && pagedTransactions?.length > 0 ? (
              pagedTransactions?.map((invoice) => (
                <TableRow
                  element="tb"
                  key={invoice?.id}
                  className="w-full overflow-x-auto px-6 py-4 text-sm last:rounded-b-2xl"
                >
                  <TableCell element={"td"}>
                    {invoice?.duration} weeks
                  </TableCell>
                  <TableCell element={"td"}>{invoice?.quantity}</TableCell>
                  <TableCell element={"td"} className="flex items-center gap-1">
                    <USDTIcon className="size-5 shrink-0" />
                    <span>{invoice?.meta_asset_price ?? "N/A"} USDT</span>
                  </TableCell>
                  <TableCell element={"td"}>
                    {invoice?.date
                      ? dayjs(invoice?.date).format("DD MMM YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell element={"td"} className="flex items-center gap-1">
                    <USDTIcon className="size-5 shrink-0" />
                    <span>
                      {invoice?.meta_asset_price != null &&
                      invoice?.quantity != null
                        ? invoice.meta_asset_price * invoice.quantity
                        : "N/A"}{" "}
                      USDT
                    </span>
                  </TableCell>
                  <TableCell element={"td"} className="text-center">
                    <button onClick={() => handleDownloadPDF(invoice)}>
                      <RiDownload2Fill className="size-5 text-white" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                element="tb"
                className="overflow-x-aut h-[72px] w-full !bg-primary-dark px-6 py-4 text-sm last:rounded-b-2xl"
              >
                <td colSpan={6}>
                  <div className="flex flex-col gap-4 py-10">
                    <ExclaimationIcon className="mx-auto size-8 shrink-0 cursor-pointer [&>path]:fill-white" />
                    <h3 className="text-center text-sm text-white">
                      There is no invoices.
                    </h3>
                  </div>
                </td>
              </TableRow>
            )}
            <tr>
              <td colSpan={6}>
                <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={page <= 1 || totalPages <= 1}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
                  >
                    <HiMiniArrowLeft /> Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages || totalPages <= 1}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
                  >
                    Next <HiMiniArrowRight />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
        </div>
      )}
    </div>
  );
};
