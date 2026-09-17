"use client";

import Link from "next/link";
import { AppRoutes } from "@/constants/app-routes";

const lessons = [
  {
    title: "Getting started with your portfolio",
    summary: "Learn how balance, meta assets, and rewards fit together in the dashboard.",
  },
  {
    title: "Understanding withdrawals",
    summary: "Review network selection, minimum amounts, and confirmation steps before withdrawing.",
  },
  {
    title: "Referral rewards basics",
    summary: "See how affiliates, commission, and eligibility are tracked on the Affiliates page.",
  },
  {
    title: "Reading transaction history",
    summary: "Balance and card tabs show deposits, withdrawals, and statuses across pages.",
  },
];

export default function EducationPage() {
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
        {lessons.map((lesson) => (
          <article
            key={lesson.title}
            className="rounded-xl bg-primary-dark p-5 text-white"
          >
            <h2 className="text-base font-semibold">{lesson.title}</h2>
            <p className="mt-2 text-sm text-white/70">{lesson.summary}</p>
          </article>
        ))}
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
