"use client";

import { useState } from "react";

const notifications = [
  { id: 1, title: "Reward credited", message: "Your latest referral reward is available.", date: "Today, 09:42" },
  { id: 2, title: "Position update", message: "Your portfolio metrics were updated successfully.", date: "Yesterday, 16:18" },
  { id: 3, title: "Demo workspace ready", message: "Explore the dashboard, affiliates, and leaderboard views.", date: "28 Aug 2026" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  return <section className="flex flex-col gap-4"><div className="rounded-xl bg-primary-dark p-6 text-white"><p className="text-sm text-white/60">Inbox</p><h1 className="mt-1 text-2xl font-semibold">Notifications</h1><p className="mt-2 text-sm text-white/70">{items.length} updates in your workspace</p></div><div className="flex flex-col gap-3">{items.map((item) => <article key={item.id} className="flex items-start justify-between gap-4 rounded-xl bg-primary-dark p-5 text-white"><div><h2 className="font-semibold">{item.title}</h2><p className="mt-1 text-sm text-white/70">{item.message}</p><time className="mt-3 block text-xs text-white/50">{item.date}</time></div><button type="button" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))} className="text-xs text-white/60 hover:text-white">Dismiss</button></article>)}</div></section>;
}