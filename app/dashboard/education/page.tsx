"use client";

import { useState } from "react";
import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";

const lessons = [
  {
    title: "Getting started with your portfolio",
    summary: "Learn how balance, meta assets, and rewards fit together in the dashboard.",
    body: "Your dashboard has three parts. Available Balance is what you can withdraw or spend. Meta Assets Details shows your owned offices, their value at $1,000 per office, and the position dates. Rewards lists every sale and referral payment, and USDT Earned Until Now is the total of that list. Start on the dashboard, then check Affiliates and Invoices to see the same numbers from the other side.",
  },
  {
    title: "Understanding withdrawals",
    summary: "Review network selection, minimum amounts, and confirmation steps before withdrawing.",
    body: "Withdrawals go out on BNB Smart Chain, so enter a BNB Smart Chain (0x) address. The minimum amount is 0.001 USDT. Enter the address and amount, confirm, and the withdrawal appears in your transaction history. Escape, clicking outside the modal, or the X button all close the Withdraw modal without submitting anything.",
  },
  {
    title: "Referral rewards basics",
    summary: "See how affiliates, commission, and eligibility are tracked on the Affiliates page.",
    body: "Anyone who joins with your referral link appears on the Affiliates page with the offices they own and the weekly commission they generate. The Referral Details card totals those rows: referrals joined, offices owned, asset value, weekly commission, and last month rewards. You are eligible for referral rewards once you own at least one meta asset.",
  },
  {
    title: "Reading transaction history",
    summary: "Balance and card tabs show deposits, withdrawals, and statuses across pages.",
    body: "The transaction table lists deposits and withdrawals with a status of Confirmed, Pending, or Rejected. The card tab shows the same history from card payments. Use the year selector to move between years, and the pagination controls to move between pages; on the last page the Next button is visibly disabled.",
  },
];

export default function EducationPage() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-xl bg-primary-dark p-6 text-white">
        <p className="text-sm text-white/60">Learning center</p>
        <h1 className="mt-1 text-2xl font-semibold">Education</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Short guides for the demo workspace. Content is local and does not call an external LMS.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {lessons.map((lesson) => {
          const open = openTitle === lesson.title;
          return (
            <article
              key={lesson.title}
              className="rounded-xl bg-primary-dark p-5 text-white"
            >
              <h2 className="text-base font-semibold">{lesson.title}</h2>
              <p className="mt-2 text-sm text-white/70">{lesson.summary}</p>
              {open && (
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {lesson.body}
                </p>
              )}
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenTitle(open ? null : lesson.title)}
                className="mt-4 rounded-lg border border-gray-shade-1/10 bg-primary-light px-4 py-2 text-sm text-white hover:text-green"
              >
                {open ? "Close guide" : "Read guide"}
              </button>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl bg-primary-dark p-5 text-white">
        <p className="text-sm text-white/70">
          Prefer a walkthrough? Open the{" "}
          <Link
            href={AppRoutes.dashboard.chat_bot}
            className="underline underline-offset-2"
          >
            Chat bot
          </Link>{" "}
          for quick answers about dashboard flows.
        </p>
      </div>
    </section>
  );
}
